#!/usr/bin/env python3
"""
Ventic — Vast.ai LLM Inventory Sizer v2
Quotazione automatica per 4 modelli privati su Vast.ai con stima VRAM e selezione macchina.

Novità v2:
- Filtro provenienza: --region EU/US/ANY o --country IT,DE,FR (ISO 3166-1 alpha-2, anche lista "IT,DE,FR")
- Filtro datacenter: --datacenter true|false|any  (true = solo hosting_type=1)
- Verifica adeguatezza host: RAM, CPU cores, disk, reliability, inet, verification
- Costo rete: inet_down_cost_per_tb / inet_up_cost_per_tb -> stima mensile
- Modalità live: --live usa offerte reali Vast.ai (se API raggiungibile), altrimenti fallback catalog

Uso:
  python3 scripts/vast-llm-inventory.py --model all --context 200000 --concurrency 4 --quant auto
  python3 scripts/vast-llm-inventory.py --model qwen3.8-27b --context 200000 --concurrency 1 --region EU --country IT --datacenter true --live
  python3 scripts/vast-llm-inventory.py --list-gpus --region EU --datacenter true
"""
import argparse, json, math, sys, urllib.request
from collections import Counter
from pathlib import Path
import time

# ── FX: tasso giornaliero EUR/USD (Frankfurter ECB) ──────────────────────────
_FX_CACHE = {"rate": 0.8589, "date": "2026-08-28", "source": "Frankfurter (ECB) fallback"}
def get_eur_rate():
    global _FX_CACHE
    cache_file = Path("/tmp/ventic_fx_cache.json")
    try:
        if cache_file.exists():
            j=json.loads(cache_file.read_text())
            ts=j.get("ts",0)
            if time.time()-ts < 86400 and "rate" in j:
                _FX_CACHE=j
                return j["rate"], j["date"], j["source"]
    except: pass
    urls = [
        "https://api.frankfurter.app/latest?from=USD&to=EUR",
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
    ]
    for url in urls:
        try:
            req=urllib.request.Request(url, headers={"User-Agent":"VenticSizer/2.0"})
            with urllib.request.urlopen(req, timeout=5) as r:
                j=json.loads(r.read().decode())
                rate=None; date=j.get("date", _FX_CACHE["date"])
                if "rates" in j and "EUR" in j["rates"]:
                    rate=j["rates"]["EUR"]; source="Frankfurter (ECB)"
                elif "usd" in j and "eur" in j["usd"]:
                    rate=j["usd"]["eur"]; source="fawazahmed0/currency-api"
                if rate:
                    _FX_CACHE={"rate":rate,"date":date,"source":source,"ts":time.time()}
                    try: cache_file.write_text(json.dumps(_FX_CACHE))
                    except: pass
                    return rate, date, source
        except: continue
    return _FX_CACHE["rate"], _FX_CACHE["date"], _FX_CACHE["source"] + " (cached)"
def usd_to_eur(usd, rate=None):
    if rate is None: rate=_FX_CACHE["rate"]
    return round(usd*rate,2)


# ── MODEL CATALOG ──────────────────────────────────────────────────────────────
MODEL_CATALOG = {
    "qwen3.8-27b": {
        "hf_id": "Qwen/Qwen3.8-27B",
        "hf_proxy": "Qwen/Qwen3.6-27B-FP8",
        "params_b": 27, "active_b": 27,
        "arch": "dense + hybrid linear (qwen3_5, full_interval=4)",
        "native_ctx": 262144, "max_ctx": 1048576,
        "weights_gib": {"bf16":54.0,"fp8":27.0,"nvfp4":14.0,"q8":27.0,"mxfp8":27.0,"awq4":14.5},
        "kv_mib_per_token_fp8":0.115,"kv_mib_per_token_int8":0.115,"kv_mib_per_token_nvfp4":0.065,
        "quant_preference":["nvfp4","fp8","bf16"],
        "min_host": {"cpu_cores":16, "cpu_ram_gb":64, "disk_gb":250, "inet_mbps":300, "reliability":0.98},
        "recipes": [
            "vllm serve QUASAR-QAT/Qwen3.8-27B-QUASAR-NVFP4 --quantization modelopt_fp4 --max-model-len 262144",
            "python -m sglang.launch_server --model-path RadixArk/Qwen3.8-27B-NVFP4-BF16-LMHead --tp-size 1 --quantization modelopt_fp4 --context-length 262144 --mem-fraction-static 0.80 --speculative-algo DFlash2",
        ],
    },
    "qwen3.8-flash-next": {
        "hf_id": "Qwen/Qwen3.8-Flash-Next",
        "hf_proxy": "Qwen/Qwen3-Next-80B-A3B-Instruct-FP8",
        "params_b":125,"active_b":6,
        "arch":"MoE + hybrid linear (qwen4_exp, hidden 2560, full_interval=4)",
        "native_ctx":262144,"max_ctx":1048576,
        "weights_gib":{"bf16":250.0,"fp8":125.0,"nvfp4":65.0,"q8":125.0,"mxfp8":125.0},
        "kv_mib_per_token_fp8":0.12,"kv_mib_per_token_int8":0.12,"kv_mib_per_token_nvfp4":0.07,
        "quant_preference":["nvfp4","fp8","bf16"],
        "min_host":{"cpu_cores":32,"cpu_ram_gb":128,"disk_gb":600,"inet_mbps":500,"reliability":0.985},
        "recipes": [
            "vllm serve Qwen/Qwen3-Next-80B-A3B-Instruct-FP8 --tensor-parallel-size 4 --max-model-len 262144",
            "python -m sglang.launch_server --model-path Qwen/Qwen3-Next-80B-A3B-Instruct-FP8 --tp-size 4 --context-length 262144 --mem-fraction-static 0.8",
        ],
    },
    "deepseek-v4-flash": {
        "hf_id":"nvidia/DeepSeek-V4-Flash-NVFP4",
        "hf_proxy":"deepseek-ai/DeepSeek-V4-Flash",
        "params_b":284,"active_b":13,
        "arch":"MoE + MLA + DSA + MTP (hidden 4096, 43L, kv_heads=1) — NVFP4 ModelOpt v0.44",
        "native_ctx":1048576,"max_ctx":1048576,
        "weights_gib":{"bf16":568.0,"fp8":284.0,"nvfp4":156.7,"q8":284.0,"mxfp4":158.0,"mxfp8":284.0},
        "kv_mib_per_token_fp8":0.06,"kv_mib_per_token_int8":0.06,"kv_mib_per_token_nvfp4":0.03,
        "quant_preference":["nvfp4","fp8","bf16"],
        "min_host":{"cpu_cores":32,"cpu_ram_gb":256,"disk_gb":900,"inet_mbps":800,"reliability":0.99},
        "recipes": [
            "vllm serve nvidia/DeepSeek-V4-Flash-NVFP4 --tensor-parallel-size 4 --trust-remote-code --kv-cache-dtype fp8  # vLLM 0.22.1 nightly-aarch64, GB300/B200 Blackwell",
            "python -m sglang.launch_server --model nvidia/DeepSeek-V4-Flash-NVFP4 --tensor-parallel-size 8 --trust-remote-code  # SGLang PR #25820, auto-detect NVFP4",
            "vllm serve deepseek-ai/DeepSeek-V4-Flash-0731 --trust-remote-code --kv-cache-dtype fp8 --block-size 256 --tensor-parallel-size 4 --max-model-len 1048576 --tokenizer-mode deepseek_v4 --tool-call-parser deepseek_v4  # fallback FP8 Hopper",
        ],
    },
    "deepseek-v4-pro": {
        "hf_id":"deepseek-ai/DeepSeek-V4-Pro",
        "params_b":1600,"active_b":49,
        "arch":"MoE + MLA + DSA + MTP (hidden 7168, 61L, kv_heads=1)",
        "native_ctx":1048576,"max_ctx":1048576,
        "weights_gib":{"bf16":3200.0,"fp8":1600.0,"nvfp4":862.0,"q8":1600.0,"mxfp4":862.0},
        "kv_mib_per_token_fp8":0.08,"kv_mib_per_token_int8":0.08,"kv_mib_per_token_nvfp4":0.045,
        "quant_preference":["nvfp4","fp8"],
        "min_host":{"cpu_cores":64,"cpu_ram_gb":512,"disk_gb":2000,"inet_mbps":1000,"reliability":0.99},
        "recipes": [
            "vllm serve deepseek-ai/DeepSeek-V4-Pro --trust-remote-code --tensor-parallel-size 8 --pipeline-parallel-size 2 --enable-expert-parallel --kv-cache-dtype fp8 --block-size 256 --max-model-len 1048576 (concettuale, 2-3 nodi)",
        ],
    },
}


MODEL_BENCH = {
    "qwen3.8-27b": {"single_tps": 120, "total_tps": 1400},
    "qwen3.8-flash-next": {"single_tps": 195, "total_tps": 4000},
    "deepseek-v4-flash": {"single_tps": 200, "total_tps": 2200},
    "deepseek-v4-pro": {"single_tps": 150, "total_tps": 1600},
}
def get_overbooking_factor(model_key, users, desired_tps):
    b = MODEL_BENCH.get(model_key, {"single_tps": 100, "total_tps": 1500})
    f = 0.60 + 0.40 * (desired_tps / max(1, b["single_tps"]))
    f += max(0, users - 4) * 0.015
    if users * desired_tps > b["total_tps"] * 0.9:
        f = 1.0
    return min(1.0, max(0.60, f))

def get_disk_offload_factor(users, fascia="office"):
    base = 0.55 if fascia == "office" else 0.80
    scale = 1.0 if users <= 4 else 0.92 if users <= 8 else 0.85
    return min(1.0, base * scale + (1 - scale) * 0.3)

EU_COUNTRIES = {"AL","AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","CH","NO","GB","IS","UK","TR","RS","UA","ME","MK","BA"}

GPU_CATALOG_FALLBACK = [
    {"name":"RTX 4090","vram_gib":24,"arch":"ada","spot_dph":0.35,"ondemand_dph":0.60,"bw_tbps":1.0,"interconnect":"PCIe","cpu_cores":16,"cpu_ram_gb":64,"disk_gb":500,"reliability":0.985,"inet_down":600,"inet_up":400,"hosting_type":0,"geolocation":"Milan, IT","verification":"verified","inet_down_cost_per_tb":2.5,"inet_up_cost_per_tb":4.0,"storage_cost_per_gb_month":0.08,"gpu_ram":24576,"num_gpus":1},
    {"name":"L40S","vram_gib":48,"arch":"ada","spot_dph":0.55,"ondemand_dph":1.05,"bw_tbps":0.864,"interconnect":"PCIe","cpu_cores":24,"cpu_ram_gb":128,"disk_gb":800,"reliability":0.99,"inet_down":1000,"inet_up":800,"hosting_type":1,"geolocation":"Frankfurt, DE","verification":"verified","inet_down_cost_per_tb":2.0,"inet_up_cost_per_tb":3.5,"storage_cost_per_gb_month":0.10,"gpu_ram":49152,"num_gpus":1},
    {"name":"A100 80GB","vram_gib":80,"arch":"ampere","spot_dph":0.70,"ondemand_dph":1.10,"bw_tbps":2.0,"interconnect":"NVLink","cpu_cores":32,"cpu_ram_gb":256,"disk_gb":1000,"reliability":0.992,"inet_down":1000,"inet_up":1000,"hosting_type":1,"geolocation":"Paris, FR","verification":"verified","inet_down_cost_per_tb":1.5,"inet_up_cost_per_tb":2.5,"storage_cost_per_gb_month":0.12,"gpu_ram":81920,"num_gpus":1},
    {"name":"H100 80GB","vram_gib":80,"arch":"hopper","spot_dph":1.22,"ondemand_dph":1.70,"bw_tbps":3.35,"interconnect":"NVLink","cpu_cores":32,"cpu_ram_gb":256,"disk_gb":1000,"reliability":0.993,"inet_down":2000,"inet_up":2000,"hosting_type":1,"geolocation":"Milan, IT","verification":"verified","inet_down_cost_per_tb":1.2,"inet_up_cost_per_tb":2.0,"storage_cost_per_gb_month":0.15,"gpu_ram":81920,"num_gpus":1},
    {"name":"H200 141GB","vram_gib":141,"arch":"hopper","spot_dph":1.90,"ondemand_dph":3.40,"bw_tbps":4.8,"interconnect":"NVLink","cpu_cores":48,"cpu_ram_gb":512,"disk_gb":1800,"reliability":0.994,"inet_down":2500,"inet_up":2500,"hosting_type":1,"geolocation":"Frankfurt, DE","verification":"verified","inet_down_cost_per_tb":1.0,"inet_up_cost_per_tb":1.8,"storage_cost_per_gb_month":0.15,"gpu_ram":144384,"num_gpus":1},
    {"name":"B200 192GB","vram_gib":192,"arch":"blackwell","spot_dph":2.12,"ondemand_dph":4.50,"bw_tbps":8.0,"interconnect":"NVLink","cpu_cores":64,"cpu_ram_gb":1024,"disk_gb":2500,"reliability":0.995,"inet_down":4000,"inet_up":4000,"hosting_type":1,"geolocation":"Milan, IT","verification":"verified","inet_down_cost_per_tb":0.8,"inet_up_cost_per_tb":1.5,"storage_cost_per_gb_month":0.18,"gpu_ram":196608,"num_gpus":1},
    {"name":"RTX PRO 6000","vram_gib":96,"arch":"blackwell","spot_dph":1.20,"ondemand_dph":1.80,"bw_tbps":1.8,"interconnect":"PCIe","cpu_cores":32,"cpu_ram_gb":256,"disk_gb":1200,"reliability":0.99,"inet_down":1500,"inet_up":1200,"hosting_type":0,"geolocation":"Milan, IT","verification":"verified","inet_down_cost_per_tb":2.0,"inet_up_cost_per_tb":3.0,"storage_cost_per_gb_month":0.10,"gpu_ram":98304,"num_gpus":1},
    {"name":"GB200 NVL72","vram_gib":192,"arch":"blackwell","spot_dph":6.00,"ondemand_dph":9.00,"bw_tbps":8.0,"interconnect":"NVLink","cpu_cores":96,"cpu_ram_gb":2048,"disk_gb":4000,"reliability":0.997,"inet_down":8000,"inet_up":8000,"hosting_type":1,"geolocation":"Frankfurt, DE","verification":"verified","inet_down_cost_per_tb":0.5,"inet_up_cost_per_tb":1.0,"storage_cost_per_gb_month":0.20,"gpu_ram":196608,"num_gpus":1},
    {"name":"MI300X","vram_gib":192,"arch":"mi300x","spot_dph":2.99,"ondemand_dph":2.99,"bw_tbps":5.3,"interconnect":"Infinity Fabric","cpu_cores":13,"cpu_ram_gb":224,"disk_gb":13312,"reliability":0.992,"inet_down":2000,"inet_up":2000,"hosting_type":1,"geolocation":"Frankfurt, DE","verification":"verified","inet_down_cost_per_tb":1.2,"inet_up_cost_per_tb":2.0,"storage_cost_per_gb_month":0.12,"gpu_ram":196608,"num_gpus":1},
]

BUNDLE_OPTIONS=[1,2,3,4,6,8]
FLEET_BUNDLES=[(2,"H200 141GB",282),(3,"H200 141GB",423),(4,"H200 141GB",564),(2,"B200 192GB",384),(3,"B200 192GB",576),(4,"B200 192GB",768),(5,"B200 192GB",960),(6,"B200 192GB",1152),(7,"B200 192GB",1344),(8,"H200 141GB",1128),(9,"B200 192GB",1728)]

# ── Helpers: VRAM ────────────────────────────────────────────────────────────
def estimate_vram_gib(model_key, quant, ctx_tokens, concurrency, kv_dtype="fp8", desired_tps=None, fascia="office"):
    m=MODEL_CATALOG[model_key]
    if quant=="auto": quant=m["quant_preference"][0]
    weights=m["weights_gib"].get(quant)
    if weights is None:
        weights=m["weights_gib"]["fp8"]; quant="fp8"
    # KV 8-bit: fp8 e int8 sono 1 byte/token, nvfp4 è 4-bit (~56% di fp8)
    if desired_tps is not None:
        OVERBOOKING_FACTOR=get_overbooking_factor(model_key, concurrency, desired_tps)
    else:
        OVERBOOKING_FACTOR=0.75
    DISK_FACTOR=get_disk_offload_factor(concurrency, fascia)
    kv_per_raw=m.get("kv_mib_per_token_nvfp4", m["kv_mib_per_token_fp8"]) if (kv_dtype=="nvfp4" or quant=="nvfp4") else (m.get("kv_mib_per_token_int8", m["kv_mib_per_token_fp8"]))
    kv_gib_raw=kv_per_raw*ctx_tokens*concurrency/1024.0
    kv_per=kv_per_raw
    kv_gib=kv_gib_raw*OVERBOOKING_FACTOR*DISK_FACTOR
    overhead=4.0 + (ctx_tokens*concurrency/200000.0)*1.5
    if "deepseek" in model_key: overhead+=2.0
    if "flash-next" in model_key: overhead+=1.0
    total=(weights+kv_gib+overhead)*1.08
    return {"quant_used":quant,"weights_gib":weights,"kv_gib":kv_gib,"overhead_gib":overhead*1.08,"total_gib":total,"kv_per_token_mib":kv_per}

def get_host_requirements(model_key, ctx, concurrency, quant_used, desired_tps=None, fascia="office"):
    base=MODEL_CATALOG[model_key]["min_host"].copy()
    est=estimate_vram_gib(model_key, quant_used, ctx, concurrency, desired_tps=desired_tps, fascia=fascia)
    needed_ram_gb = max(base["cpu_ram_gb"], int(est["weights_gib"]*1.2 + est["kv_gib"]*0.6 + 32))
    needed_disk_gb = max(base["disk_gb"], int(est["weights_gib"]*2.5 + 120))
    needed_cores = max(base["cpu_cores"], 8 + concurrency*4)
    return {
        "cpu_ram_gb": needed_ram_gb,
        "cpu_cores": needed_cores,
        "disk_gb": needed_disk_gb,
        "inet_mbps": base["inet_mbps"],
        "reliability": base["reliability"],
    }

# ── Helpers: filtering ───────────────────────────────────────────────────────
def parse_country_code(geolocation: str)->str:
    if not geolocation: return ""
    parts=geolocation.split(",")
    if len(parts)>=2:
        return parts[-1].strip().upper()
    return geolocation.strip().upper()[:2]

def is_eu_country(code:str)->bool:
    return code.upper() in EU_COUNTRIES

def offer_passes_location(offer, region, country):
    geo=offer.get("geolocation","")
    code=parse_country_code(geo)
    if country:
        wanted=[c.strip().upper() for c in country.split(",")]
        mapping={"ITALY":"IT","GERMANY":"DE","FRANCE":"FR","NETHERLANDS":"NL","SPAIN":"ES","SWITZERLAND":"CH","USA":"US","UNITED STATES":"US","ITALIA":"IT"}
        normalized=[mapping.get(c,c) for c in wanted]
        for w in normalized:
            if len(w)==2:
                if code==w: return True
            else:
                # full name: substring match on geo
                if w in geo.upper(): return True
        return False
    if region:
        r=region.upper()
        if r=="EU": return is_eu_country(code)
        if r=="US": return code=="US"
        if r in ("ANY","ALL","GLOBAL"): return True
        if "," in r:
            codes=[c.strip().upper() for c in r.split(",")]
            return code in codes
        return code==r or r in geo.upper()
    return True

def offer_passes_datacenter(offer, datacenter_filter):
    if datacenter_filter is None or str(datacenter_filter).lower()=="any": return True
    ht=offer.get("hosting_type",0)
    is_dc = (ht==1)
    # Vast a volte espone campo 'datacenter' booleano
    if "datacenter" in offer:
        is_dc = bool(offer["datacenter"])
    want=str(datacenter_filter).lower()
    if want in ("true","1","yes","datacenter","dc"): want=True
    elif want in ("false","0","no","host","residential"): want=False
    else: return True
    if want is True: return is_dc
    if want is False: return not is_dc
    return True

def offer_passes_adequacy(offer, req, min_reliability=None, require_verified=False):
    # normalizza campi Vast live (cpu_ram in MB) vs fallback (cpu_ram_gb)
    cpu_ram_gb = offer.get("cpu_ram_gb")
    if cpu_ram_gb is None:
        cpu_ram = offer.get("cpu_ram",0)
        cpu_ram_gb = cpu_ram/1024.0 if cpu_ram>2048 else cpu_ram
    disk_gb = offer.get("disk_space", offer.get("disk_gb",0))
    cores = offer.get("cpu_cores",0)
    rel = offer.get("reliability", offer.get("reliability2",0))
    ver = offer.get("verification","")
    inet = offer.get("inet_down",0)
    reasons=[]
    if cpu_ram_gb < req["cpu_ram_gb"]:
        reasons.append(f"RAM {cpu_ram_gb:.0f}GB < {req['cpu_ram_gb']}GB")
    if disk_gb < req["disk_gb"]:
        reasons.append(f"disk {disk_gb:.0f}GB < {req['disk_gb']}GB")
    if cores < req["cpu_cores"]:
        reasons.append(f"cpu_cores {cores} < {req['cpu_cores']}")
    thr = min_reliability if min_reliability is not None else req["reliability"]
    if rel < thr:
        reasons.append(f"reliability {rel:.3f} < {thr:.3f}")
    if require_verified and ver not in ("verified","verified_datacenter"):
        if ver != "verified":
            reasons.append(f"verification {ver} != verified")
    if inet < req["inet_mbps"]:
        reasons.append(f"inet_down {inet:.0f}Mbps < {req['inet_mbps']}Mbps")
    return (len(reasons)==0, reasons)

def estimate_network_cost(offer, monthly_tb_down=10, monthly_tb_up=10):
    down_per_tb = offer.get("internet_down_cost_per_tb", offer.get("inet_down_cost_per_tb", 2.5))
    up_per_tb = offer.get("internet_up_cost_per_tb", offer.get("inet_up_cost_per_tb", 4.0))
    if down_per_tb is None: down_per_tb=2.5
    if up_per_tb is None: up_per_tb=4.0
    return {
        "down_per_tb": down_per_tb,
        "up_per_tb": up_per_tb,
        "monthly_down_tb": monthly_tb_down,
        "monthly_up_tb": monthly_tb_up,
        "monthly_down_cost": round(down_per_tb*monthly_tb_down,2),
        "monthly_up_cost": round(up_per_tb*monthly_tb_up,2),
        "monthly_net_cost": round(down_per_tb*monthly_tb_down + up_per_tb*monthly_tb_up,2),
    }

# ── Vast API ─────────────────────────────────────────────────────────────────
def fetch_vast_offers():
    urls=["https://console.vast.ai/api/v0/bundles/","https://vast.ai/api/v0/bundles/"]
    for url in urls:
        try:
            req=urllib.request.Request(url, headers={"User-Agent":"VenticSizer/2.0"})
            with urllib.request.urlopen(req, timeout=7) as r:
                data=json.loads(r.read().decode())
                if isinstance(data, dict) and "offers" in data:
                    return data["offers"]
                return data
        except Exception:
            continue
    return None

def filter_vast_offers(offers, region=None, country=None, datacenter=None, min_reliability=None, require_verified=False, req_host=None):
    out=[]
    for o in offers:
        if not offer_passes_location(o, region, country):
            continue
        if not offer_passes_datacenter(o, datacenter):
            continue
        if req_host is not None:
            ok, _ = offer_passes_adequacy(o, req_host, min_reliability=min_reliability, require_verified=require_verified)
            if not ok:
                continue
        else:
            if min_reliability is not None and o.get("reliability",0) < min_reliability:
                continue
            if require_verified and o.get("verification")!="verified":
                continue
        out.append(o)
    return out

def select_machine(vram_needed_gib, gpu_catalog=None, allow_fleet=False, quant_used="fp8", req_host=None, region=None, country=None, datacenter=None, min_reliability=None, require_verified=False, monthly_tb_down=10, monthly_tb_up=10):
    if gpu_catalog is None:
        gpu_catalog=GPU_CATALOG_FALLBACK
    # Se catalog è lista di offerte Vast live (hanno 'gpu_ram'), gestisci diversamente
    is_live_offers = len(gpu_catalog)>0 and "gpu_ram" in gpu_catalog[0] and "dph_total" in gpu_catalog[0]
    if is_live_offers:
        # Filtra live offers per VRAM e adeguatezza
        candidates=[]
        for o in gpu_catalog:
            # VRAM check: gpu_total_ram o gpu_ram*num_gpus
            total_vram_mib = o.get("gpu_total_ram") or (o.get("gpu_ram",0)*o.get("num_gpus",1))
            total_vram_gib = total_vram_mib/1024.0
            if total_vram_gib < vram_needed_gib:
                continue
            if not offer_passes_location(o, region, country):
                continue
            if not offer_passes_datacenter(o, datacenter):
                continue
            if req_host is not None:
                ok,_ = offer_passes_adequacy(o, req_host, min_reliability=min_reliability, require_verified=require_verified)
                if not ok:
                    continue
            # arch check: per live, verifica gpu_name -> arch mapping grossolano
            # skippato qui perché già filtrato via quant_support in fallback; live può avere gpu miste
            net = estimate_network_cost(o, monthly_tb_down, monthly_tb_up)
            candidates.append((o, net))
        if not candidates:
            return None
        # ordina per dph_total + net cost mensile ammortizzato su ore (730h/mese)
        def score(item):
            o, net = item
            hourly_net = net["monthly_net_cost"]/730.0
            return (o.get("dph_total",999) + hourly_net, -o.get("reliability",0))
        candidates.sort(key=score)
        best, net = candidates[0]
        total_vram_gib = (best.get("gpu_total_ram") or best.get("gpu_ram")*best.get("num_gpus",1))/1024.0
        return {
            "type": f"{best.get('num_gpus')}× {best.get('gpu_name')} (live #{best.get('id')})",
            "n": best.get("num_gpus"),
            "gpu": best.get("gpu_name"),
            "arch": best.get("gpu_arch","unknown"),
            "total_vram_gib": round(total_vram_gib,1),
            "spot_dph": round(best.get("dph_total",0),3),
            "spot_dph_eur": round(usd_to_eur(best.get("dph_total",0)),2),
            "ondemand_dph": round(best.get("dph_total",0),3), "ondemand_dph_eur": round(usd_to_eur(best.get("dph_total",0)),2),
            "ventic_spot": round(best.get("dph_total",0)*0.5,3), "ventic_spot_eur": round(usd_to_eur(best.get("dph_total",0)*0.5),2),
            "ventic_ondemand": round(best.get("dph_total",0)*0.5,3), "ventic_ondemand_eur": round(usd_to_eur(best.get("dph_total",0)*0.5),2),
            "interconnect": "NVLink" if best.get("bw_nvlink",0)>0 else "PCIe",
            "is_fleet": False,
            "waste_gib": round(total_vram_gib - vram_needed_gib,1),
            "geolocation": best.get("geolocation"),
            "hosting_type": best.get("hosting_type"),
            "reliability": best.get("reliability"),
            "verification": best.get("verification"),
            "cpu_cores": best.get("cpu_cores"),
            "cpu_ram_gb": round(best.get("cpu_ram",0)/1024.0,1) if best.get("cpu_ram") else None,
            "disk_gb": best.get("disk_space"),
            "inet_down": best.get("inet_down"),
            "inet_up": best.get("inet_up"),
            "net_cost": net,
            "host_id": best.get("host_id"),
            "offer_id": best.get("id"),
        }

    # Fallback catalog logic (ideale)
    quant_support={"ada":{"bf16","awq4","int4","q8"},"ampere":{"bf16","int8","q8","fp8"},"hopper":{"bf16","fp8","int8","q8"},"blackwell":{"bf16","fp8","nvfp4","mxfp4","mxfp8","awq4","int4","int8","q8"},"mi300x":{"bf16","fp8","q8","int8","awq4","nvfp4"}}
    candidates=[]
    for gpu in gpu_catalog:
        # Per-GPU quant: trova la migliore quantizzazione supportata per questo hardware
        # Se quant_used non è supportata, fallback a q8/fp8/bf16
        effective_quant = quant_used
        effective_vram_needed = vram_needed_gib
        effective_req_host = req_host
        allowed=quant_support.get(gpu["arch"], set())
        if quant_used not in allowed:
            # prova fallback q8 -> fp8 -> bf16
            fallback_order = ["q8","fp8","bf16","int8","awq4"]
            found=False
            for fq in fallback_order:
                if fq in allowed:
                    # ricalcola vram_needed per fallback quant se possibile
                    # Cerca model_key dal contesto: non disponibile qui, quindi mantieni vram_needed ma scala per differenza pesi
                    # Approssimazione: q8 pesa come fp8 (1 byte), quindi +~13G per Qwen27B, +127G per Flash
                    # Per accuratezza, usa vram_needed_gib + delta se q8 vs nvfp4
                    # Delta = (q8_weight - nvfp4_weight) se nvfp4 originale
                    # Ma senza model_key, approssima +30% per q8 vs nvfp4
                    if quant_used=="nvfp4" and fq in ("q8","fp8"):
                        effective_vram_needed = vram_needed_gib * 1.18  # q8 pesa ~2x nvfp4 (14->27), ma con overhead meno
                        effective_quant = fq
                        found=True
                        break
                    elif quant_used=="q8" and fq=="bf16":
                        effective_vram_needed = vram_needed_gib * 1.9
                        effective_quant = fq
                        found=True
                        break
            if not found:
                continue
            # Verifica adeguatezza con eventuale req_host ricalcolato per fallback (RAM/disk maggiori)
            # Se req_host fornito, ricalcola con peso maggiore (euristica +20% RAM)
            if req_host is not None and effective_quant in ("q8","fp8"):
                effective_req_host = req_host.copy()
                effective_req_host["cpu_ram_gb"] = int(req_host["cpu_ram_gb"] * 1.15)
                effective_req_host["disk_gb"] = int(req_host["disk_gb"] * 1.2)
        else:
            allowed=quant_support.get(gpu["arch"], set())
        # filtro location/datacenter su fallback (geolocation fissa del catalog)
        if not offer_passes_location(gpu, region, country):
            continue
        if not offer_passes_datacenter(gpu, datacenter):
            continue
        if effective_req_host is not None:
            ok,_ = offer_passes_adequacy(gpu, effective_req_host, min_reliability=min_reliability, require_verified=require_verified)
            if not ok:
                continue
        for n in BUNDLE_OPTIONS:
            total_vram=gpu["vram_gib"]*n
            if total_vram < effective_vram_needed:
                continue
            # per bundle, scala anche cpu_ram/disk linearmente (euristica: host con più GPU ha più risorse host)
            # nel catalog fallback ogni entry è single-host; per bundle n, moltiplica risorse host?
            # Usiamo euristica: cpu_ram_gb * n (se cluster) ma per single-host n GPU, cpu_ram resta uguale (host singolo)
            # Quindi adequacy già verificata su single host, non serve scalare
            spot=gpu["spot_dph"]*n
            ondemand=gpu["ondemand_dph"]*n
            net=estimate_network_cost(gpu, monthly_tb_down, monthly_tb_up)
            # costo rete mensile ammortizzato
            hourly_net = net["monthly_net_cost"]/730.0
            candidates.append({
                "type": f"{n}× {gpu['name']}",
                "n": n, "gpu": gpu["name"], "arch": gpu["arch"],
                "total_vram_gib": total_vram,
                "spot_dph": round(spot,2), "spot_dph_eur": round(usd_to_eur(spot),2),
                "ondemand_dph": round(ondemand,2), "ondemand_dph_eur": round(usd_to_eur(ondemand),2),
                "ventic_spot": round(spot*0.5,2), "ventic_spot_eur": round(usd_to_eur(spot*0.5),2),
                "ventic_ondemand": round(ondemand*0.5,2), "ventic_ondemand_eur": round(usd_to_eur(ondemand*0.5),2),
                "interconnect": gpu["interconnect"], "is_fleet": False,
                "waste_gib": total_vram - vram_needed_gib,
                "geolocation": gpu["geolocation"], "hosting_type": gpu["hosting_type"],
                "reliability": gpu["reliability"], "verification": gpu["verification"],
                "cpu_cores": gpu["cpu_cores"], "cpu_ram_gb": gpu["cpu_ram_gb"],
                "disk_gb": gpu["disk_gb"], "inet_down": gpu["inet_down"], "inet_up": gpu["inet_up"],
                "net_cost": net,
                "score": spot + hourly_net,
            })
    if allow_fleet or vram_needed_gib>564:
        for (n,gpu_name,total_vram) in FLEET_BUNDLES:
            if total_vram < vram_needed_gib: continue
            base=next((g for g in gpu_catalog if g["name"]==gpu_name), None)
            if not base: continue
            if quant_used not in quant_support.get(base["arch"],set()): continue
            if not offer_passes_location(base, region, country): continue
            if not offer_passes_datacenter(base, datacenter): continue
            # adequacy fleet: aggrega risorse su nodi (ceil(n/4) nodi, ogni nodo ha risorse base)
            if req_host is not None:
                nodes = math.ceil(n/4)
                agg_host = {
                    "cpu_ram_gb": base["cpu_ram_gb"] * nodes,
                    "cpu_cores": base["cpu_cores"] * nodes,
                    "disk_gb": base["disk_gb"] * nodes,
                    "inet_down": base["inet_down"],
                    "reliability": base["reliability"],
                    "verification": base["verification"],
                }
                ok,_=offer_passes_adequacy(agg_host, req_host, min_reliability=min_reliability, require_verified=require_verified)
                if not ok: continue
            spot=base["spot_dph"]*n; ondemand=base["ondemand_dph"]*n
            net=estimate_network_cost(base, monthly_tb_down, monthly_tb_up)
            hourly_net=net["monthly_net_cost"]/730.0 * n  # fleet: n volte rete
            candidates.append({
                "type": f"{n}× {gpu_name} (fleet {math.ceil(n/4)} nodi)",
                "n": n, "gpu": gpu_name, "arch": base["arch"],
                "total_vram_gib": total_vram,
                "spot_dph": round(spot,2), "spot_dph_eur": round(usd_to_eur(spot),2),
                "ondemand_dph": round(ondemand,2), "ondemand_dph_eur": round(usd_to_eur(ondemand),2),
                "ventic_spot": round(spot*0.5,2), "ventic_spot_eur": round(usd_to_eur(spot*0.5),2),
                "ventic_ondemand": round(ondemand*0.5,2), "ventic_ondemand_eur": round(usd_to_eur(ondemand*0.5),2),
                "interconnect": "RoCE/IB (fleet)", "is_fleet": True,
                "waste_gib": total_vram - vram_needed_gib,
                "geolocation": base["geolocation"]+" (fleet)", "hosting_type": base["hosting_type"],
                "reliability": base["reliability"], "verification": base["verification"],
                "cpu_cores": base["cpu_cores"]*math.ceil(n/4), "cpu_ram_gb": base["cpu_ram_gb"]*math.ceil(n/4),
                "disk_gb": base["disk_gb"]*math.ceil(n/4), "inet_down": base["inet_down"], "inet_up": base["inet_up"],
                "net_cost": {"monthly_net_cost": round(net["monthly_net_cost"]*n,2), "down_per_tb": net["down_per_tb"], "up_per_tb": net["up_per_tb"], "monthly_down_tb": net["monthly_down_tb"], "monthly_up_tb": net["monthly_up_tb"], "monthly_down_cost": round(net["monthly_down_cost"]*n,2), "monthly_up_cost": round(net["monthly_up_cost"]*n,2)},
                "score": spot + hourly_net,
            })
    if not candidates:
        return None
    candidates.sort(key=lambda c: (c["score"], c["waste_gib"]))
    return candidates[0]

def fetch_vast_offers():
    urls=["https://console.vast.ai/api/v0/bundles/","https://vast.ai/api/v0/bundles/"]
    for url in urls:
        try:
            req=urllib.request.Request(url, headers={"User-Agent":"VenticSizer/2.0"})
            with urllib.request.urlopen(req, timeout=7) as r:
                data=json.loads(r.read().decode())
                if isinstance(data, dict) and "offers" in data:
                    return data["offers"]
                return data
        except Exception:
            continue
    return None

def list_gpus_live(region=None, country=None, datacenter=None, min_reliability=None, require_verified=False):
    offers=fetch_vast_offers()
    if offers:
        filtered = filter_vast_offers(offers, region=region, country=country, datacenter=datacenter, min_reliability=min_reliability, require_verified=require_verified)
        print(f"Trovate {len(offers)} offerte totali, {len(filtered)} dopo filtri (region={region}, country={country}, datacenter={datacenter}, min_reliability={min_reliability})")
        # raggruppa per geolocation
        cnt=Counter(parse_country_code(o.get("geolocation","")) for o in filtered)
        print("Per paese:", dict(cnt.most_common(10)))
        print("Per datacenter:", Counter(o.get("hosting_type") for o in filtered))
        for o in filtered[:6]:
            net=estimate_network_cost(o)
            print(json.dumps({
                "id":o.get("id"),"gpu":f"{o.get('num_gpus')}×{o.get('gpu_name')}","vram_gb":round((o.get("gpu_total_ram") or o.get("gpu_ram",0)*o.get("num_gpus",1))/1024,1),
                "geolocation":o.get("geolocation"),"hosting_type":o.get("hosting_type"),"datacenter": "yes" if o.get("hosting_type")==1 else "no",
                "cpu":f"{o.get('cpu_cores')}c/{round(o.get('cpu_ram',0)/1024)}GB","disk":o.get("disk_space"),"reliability":round(o.get("reliability",0),3),
                "verification":o.get("verification"),"inet":f"{o.get('inet_down'):.0f}/{o.get('inet_up'):.0f}Mbps","dph":round(o.get("dph_total",0),3),
                "net_per_tb":f"${net['down_per_tb']:.2f}↓ ${net['up_per_tb']:.2f}↑ /TB","net_monthly_10TB":f"${net['monthly_net_cost']}"
            }, ensure_ascii=False))
        if len(filtered)==0:
            print("Nessuna offerta soddisfa i filtri — prova ad allargare region/datacenter.")
    else:
        print("Vast.ai API non raggiungibile — uso catalogo fallback")
        for g in GPU_CATALOG_FALLBACK:
            if not offer_passes_location(g, region, country): continue
            if not offer_passes_datacenter(g, datacenter): continue
            if min_reliability and g["reliability"] < min_reliability: continue
            print(f"{g['name']:15} {g['vram_gib']:3}GB  {g['geolocation']:15} dc={'yes' if g['hosting_type']==1 else 'no'}  spot ${g['spot_dph']}/h  rel {g['reliability']:.3f}  cpu {g['cpu_cores']}c/{g['cpu_ram_gb']}GB disk {g['disk_gb']}GB  inet {g['inet_down']}Mbps  net ${g['inet_down_cost_per_tb']:.2f}/${g['inet_up_cost_per_tb']:.2f} per TB")

def generate_matrix(models, contexts, concurrencies, quant="auto", kv_dtype="fp8", region=None, country=None, datacenter=None, min_reliability=None, require_verified=False, use_live=False, monthly_tb_down=10, monthly_tb_up=10, show_host=False):
    rows=[]
    # se use_live, pre-carica offerte
    live_offers=None
    if use_live:
        live_offers=fetch_vast_offers()
        if live_offers is None:
            print("⚠️  --live richiesto ma API offline, uso fallback", file=sys.stderr)
            use_live=False
    gpu_catalog_for_fallback = GPU_CATALOG_FALLBACK
    for mk in models:
        for ctx in contexts:
            for conc in concurrencies:
                est=estimate_vram_gib(mk, quant, ctx, conc, kv_dtype=kv_dtype)
                req=get_host_requirements(mk, ctx, conc, est["quant_used"])
                # override reliability se utente ha specificato
                eff_rel = min_reliability if min_reliability is not None else req["reliability"]
                req_eff = req.copy()
                req_eff["reliability"]=eff_rel
                if use_live and live_offers is not None:
                    machine=select_machine(est["total_gib"], gpu_catalog=live_offers, allow_fleet=("pro" in mk), quant_used=est["quant_used"], req_host=req_eff, region=region, country=country, datacenter=datacenter, min_reliability=min_reliability, require_verified=require_verified, monthly_tb_down=monthly_tb_down, monthly_tb_up=monthly_tb_up)
                else:
                    machine=select_machine(est["total_gib"], gpu_catalog=gpu_catalog_for_fallback, allow_fleet=("pro" in mk), quant_used=est["quant_used"], req_host=req_eff, region=region, country=country, datacenter=datacenter, min_reliability=min_reliability, require_verified=require_verified, monthly_tb_down=monthly_tb_down, monthly_tb_up=monthly_tb_up)
                # adequacy detail
                host_ok=True
                host_reasons=[]
                if machine is not None and req_eff is not None:
                    # verifica finale su machine selezionata
                    # machine per fallback ha già campi, per live anche
                    ok, reasons = offer_passes_adequacy(machine if "cpu_ram_gb" in machine else {"cpu_ram_gb":machine.get("cpu_ram_gb",0),"disk_gb":machine.get("disk_gb",0),"cpu_cores":machine.get("cpu_cores",0),"reliability":machine.get("reliability",0),"verification":machine.get("verification",""),"inet_down":machine.get("inet_down",0)}, req_eff, min_reliability=min_reliability, require_verified=require_verified)
                    host_ok=ok; host_reasons=reasons
                rows.append({
                    "model": mk, "hf_id": MODEL_CATALOG[mk]["hf_id"],
                    "quant_requested": quant, "quant_used": est["quant_used"], "kv_dtype": kv_dtype,
                    "context": ctx, "concurrency": conc, "total_tokens": ctx*conc,
                    "weights_gib": round(est["weights_gib"],1), "kv_gib": round(est["kv_gib"],1),
                    "overhead_gib": round(est["overhead_gib"],1), "vram_needed_gib": round(est["total_gib"],1),
                    "host_req": req_eff,
                    "host_ok": host_ok, "host_reasons": host_reasons,
                    "machine": machine,
                    "filters": {"region":region,"country":country,"datacenter":datacenter,"min_reliability":min_reliability,"require_verified":require_verified},
                })
    return rows

def main():
    # Precarica tasso FX giornaliero
    eur_rate, fx_date, fx_source = get_eur_rate()
    ap=argparse.ArgumentParser(description=f"Ventic Vast.ai LLM sizer v2 — con filtri EU/datacenter e verifica host — FX {eur_rate:.4f} EUR/USD {fx_date} {fx_source}")
    ap.add_argument("--model", default="all", help="model key o all")
    ap.add_argument("--context", default="200000", help="context per utente")
    ap.add_argument("--concurrency", default="1", help="concorrenza")
    ap.add_argument("--quant", default="auto", choices=["auto","nvfp4","mxfp4","fp8","bf16"])
    ap.add_argument("--kv-dtype", default="fp8", choices=["fp8","nvfp4"])
    ap.add_argument("--region", default=None, help="Filtro regione: EU, US, ANY o lista codici 'IT,DE'")
    ap.add_argument("--country", default=None, help="Filtro paese: IT, DE, FR, Italy etc (ISO 3166-1 alpha-2, anche lista)")
    ap.add_argument("--datacenter", default="any", help="Filtro datacenter: true (solo hosting_type=1), false (solo host), any")
    ap.add_argument("--min-reliability", type=float, default=None, help="Soglia minima reliability (0-1, es 0.98)")
    ap.add_argument("--require-verified", action="store_true", help="Richiedi verification=verified")
    ap.add_argument("--min-cpu-ram", type=int, default=None, help="Override minimo CPU RAM GB")
    ap.add_argument("--min-disk", type=int, default=None, help="Override minimo disk GB")
    ap.add_argument("--monthly-tb-down", type=float, default=10, help="TB download mensili stimati per costo rete")
    ap.add_argument("--monthly-tb-up", type=float, default=10, help="TB upload mensili stimati")
    ap.add_argument("--live", action="store_true", help="Usa offerte live Vast.ai invece di catalogo fallback")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--list-gpus", action="store_true")
    ap.add_argument("--refresh-pricing", action="store_true")
    ap.add_argument("--show-host", action="store_true", help="Mostra dettagli host (RAM/CPU/disk/reliability/net) in tabella")
    ap.add_argument("--report", help="path report")
    args=ap.parse_args()

    if args.list_gpus:
        list_gpus_live(region=args.region, country=args.country, datacenter=args.datacenter, min_reliability=args.min_reliability, require_verified=args.require_verified)
        return
    if args.refresh_pricing:
        offers=fetch_vast_offers()
        out=Path("reports/pricing-snapshot.json")
        out.parent.mkdir(parents=True, exist_ok=True)
        if offers:
            out.write_text(json.dumps(offers[:150], indent=2))
            print(f"Scaricate {len(offers)} offerte → {out}")
        else:
            out.write_text(json.dumps(GPU_CATALOG_FALLBACK, indent=2))
            print(f"API offline — salvato fallback → {out}")
        return

    if args.model=="all": models=list(MODEL_CATALOG.keys())
    else: models=[m.strip() for m in args.model.split(",")]
    contexts=[int(c.strip()) for c in str(args.context).split(",")]
    concurrencies=[int(c.strip()) for c in str(args.concurrency).split(",")]

    # override host req if CLI specifies
    # handled inside generate_matrix via req_host modification? Applichiamo dopo
    rows=generate_matrix(models, contexts, concurrencies, quant=args.quant, kv_dtype=args.kv_dtype, region=args.region, country=args.country, datacenter=args.datacenter, min_reliability=args.min_reliability, require_verified=args.require_verified, use_live=args.live, monthly_tb_down=args.monthly_tb_down, monthly_tb_up=args.monthly_tb_up)

    # applica override min-cpu-ram / min-disk se specificati
    if args.min_cpu_ram is not None or args.min_disk is not None:
        for r in rows:
            if args.min_cpu_ram is not None: r["host_req"]["cpu_ram_gb"]=args.min_cpu_ram
            if args.min_disk is not None: r["host_req"]["disk_gb"]=args.min_disk
            # rivaluta host_ok
            if r["machine"]:
                ok, reasons = offer_passes_adequacy(r["machine"], r["host_req"], min_reliability=args.min_reliability, require_verified=args.require_verified)
                r["host_ok"]=ok; r["host_reasons"]=reasons

    if args.json:
        print(json.dumps(rows, indent=2, ensure_ascii=False))
        Path("reports").mkdir(exist_ok=True)
        Path("reports/quotes-latest.json").write_text(json.dumps(rows, indent=2, ensure_ascii=False))
        return

    # tabella human
    hdr=f"\n{'Model':20} {'Quant':6} {'Ctx':>7} {'Conc':>4} {'VRAM':>6} {'Macchina':32} {'Spot':>10} {'Ventic':>10}  [EUR/USD {eur_rate:.4f} {fx_date}]"
    if args.show_host: hdr+="  Host adeguato? | Net 10TB"
    print(hdr)
    print("-"* (110 + (30 if args.show_host else 0)))
    for r in rows:
        m=r["machine"]
        mach=m["type"] if m else "❌ NESSUNA"
        if m and args.show_host:
            geo=m.get("geolocation","")
            hc=f" {m.get('cpu_cores')}c/{m.get('cpu_ram_gb')}GB d{m.get('disk_gb')}GB r{m.get('reliability'):.3f} {geo}"
            mach = (mach[:26] + hc)[:32]
        spot=f"${m['spot_dph']:.2f} (€{m.get('spot_dph_eur',0):.2f})" if m else "-"
        ventic=f"${m['ventic_spot']:.2f} (€{m.get('ventic_spot_eur',0):.2f})" if m else "-"
        line=f"{r['model']:20} {r['quant_used']:6} {r['context']:7} {r['concurrency']:4} {r['vram_needed_gib']:5.0f}G {mach:32} {spot:>7} {ventic:>7}"
        if args.show_host:
            host_flag = "✅" if r["host_ok"] else "❌ "+",".join(r["host_reasons"][:1])
            net = m.get("net_cost",{}) if m else {}
            net_str = f"${net.get('monthly_net_cost',0):.0f}/m" if net else "-"
            line+=f"  {host_flag:20} {net_str:>8}"
        print(line)
        if args.show_host and not r["host_ok"] and r["machine"]:
            print(f"   ↳ host reasons: {', '.join(r['host_reasons'])} | req: {r['host_req']}")
        if m and args.show_host:
            # mostra costo rete dettaglio
            net=m.get("net_cost",{})
            if net:
                print(f"   ↳ rete: ${net.get('down_per_tb')}/TB ↓ + ${net.get('up_per_tb')}/TB ↑ → ${net.get('monthly_net_cost')}/mese per {net.get('monthly_down_tb')}TB↓/{net.get('monthly_up_tb')}TB↑ | storage ~${m.get('storage_cost_per_gb_month',0.15)* (r['host_req']['disk_gb']/100):.2f}/m scontato")
    print(f"\nDettaglio VRAM: pesi + KV×conc + overhead (×1.08). Ventic = 50% running. Tasso FX: 1 USD = {eur_rate:.4f} EUR ({fx_date} {fx_source}) — prezzi mostrati in $ e €.")
    if args.region or args.country or args.datacenter!="any":
        print(f"Filtri: region={args.region} country={args.country} datacenter={args.datacenter} min_reliability={args.min_reliability} verified={args.require_verified} live={args.live}")
    print("Per DeepSeek-Pro serve fleet multi-nodo; per gli altri single-host basta.")
    print("Costo rete: internet_down_cost_per_tb / internet_up_cost_per_tb da Vast (snapshot). Sommalo al running per TCO.")

    Path("reports").mkdir(exist_ok=True)
    Path("reports/quotes-latest.json").write_text(json.dumps(rows, indent=2, ensure_ascii=False))
    print("\n→ Salvato reports/quotes-latest.json")
    if args.report:
        print(f"(report rigenerazione non implementata — vedi reports/inventario-llm-privati-2026.md)")

if __name__=="__main__":
    main()
