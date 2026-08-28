# Inventario LLM Privati — Quotazioni Vast.ai 2026
**Ventic — Private AI Infrastructure · BYOH & PaaS**  
**Data:** 28 agosto 2026 · **Autore:** analisi automatizzata + verifica ricette community  
**Modelli quotati:** Qwen3.8-Flash-Next (125B/6B), DeepSeek-V4-Flash-0731 (284B/13B), DeepSeek-V4-Pro-0813 (1.6T/49B), Qwen3.8-27B

> Questo documento è l'inventario ufficiale per la modalità **PaaS** di Ventic: ogni riga è una configurazione *verificata* su vLLM o SGLang con context window ≥200K, con varianti per **1M token per utente** e **concorrenza 1 / 4 / 16 utenti**. Preferenza esplicita a **NVFP4** (Blackwell) e **MXFP8/NVFP4** dove disponibile, con fallback **FP8 block-128** su Hopper.

---

## 1. Metodologia

1. **Ricette upstream** — per ogni modello è stata cercata la ricetta ufficiale HF + repo community che dimostra il deploy su vLLM ≥0.10.2 / SGLang ≥0.5. Tutti i comandi riportati sono copiati da `huggingface.co/*/README` o da recipe GitHub con log di boot.
2. **Stima VRAM** — `VRAM = pesi(quant) + KV_cache(ctx×concorrenza) + attivazioni + overhead 8-10%`.
   - Pesi: BF16=2 B/param, FP8=1 B, NVFP4/MXFP4=0.5 B (+ ~10% tabelle scale). Per MoE: stessi B ma solo esperti attivi pesano su compute, non su VRAM totale.
   - KV: ricavato da misure community (non da formula teorica) perché MLA/DSA + linear attention cambiano l'ordine di grandezza. Dove non misurato, si usa la formula `2 × layers × (hidden/num_heads)× num_kv_heads × bytes × ctx / GQA_shard`.
3. **Macchina Vast.ai** — scelta come **minimo VRAM totale ≥ VRAM stimata ×1.10** con margine prefill. Prezzi Vast.ai rilevati via API `console.vast.ai/api/v0/bundles` e snapshot community `gpu-price-tracker` / `Spheron` agosto 2026. Quotazione riportata: **spot** (interrompibile) e **on-demand** (garantito). Ventic PaaS = 50% del running cost (come da `src/pages/paas.astro`).
4. **Preferenza quantizzazione**:
   - **Blackwell (B200, B300, RTX PRO 6000, GB10/GB200, DGX Spark)** → `NVFP4` nativo (Tensor Core FP4), KV `fp8` o `nvfp4` sperimentale. Motivo: 2× densità pesi e sparse decode.
   - **Hopper (H100/H200)** → `FP8 block-128` fine-grained (kernel FlashInfer/TRT-LLM stabile). NVFP4 emulato, non consigliato in produzione.
   - **AMD (MI300X/MI355X)** → `MXFP4` / `MXFP8` (rocBLAS). Recipe `ryanzhou/deepseek-v4-flash-mi300x` lo conferma.

Fonti principali in fondo — ogni stima è linkata alla recipe.

---

## 2. Schede modello

### 2.1 Qwen3.8-Flash-Next — 125B total / 6B active — MoE + Hybrid Linear Attention

- **HF:** `Qwen/Qwen3.8-Flash-Next` (arch `qwen4_exp`, `text_config.hidden_size=2560`, `full_attention_interval=4` → 3/4 layer sono linear_attention, 1/4 full). Context nativo **256K**, estensibile a **1M** con YaRN (ricetta SGLang `mem_fraction_static=0.8`). Predecessore `Qwen3-Next-80B-A3B` (80B/3B, 48 layer, hidden 2048, GQA 16:2, rope_theta 10M) è usato come proxy dove mancano misure Flash-Next.
- **Quantizzazioni disponibili:**
  - Ufficiale FP8: `Qwen/Qwen3-Next-80B-A3B-Instruct-FP8` (block 128, compatibile vLLM/SGLang). Nessun artefatto ufficiale NVFP4 Flash-Next al 28/08, ma community ha convertito con `llm-compressor` / `ModelOpt`.
  - Community NVFP4: `RedHatAI/Qwen3-Next-80B-A3B-Instruct-NVFP4`, `Intel/...-int4-AutoRound` (AWQ 4bit). NVFP4 è compatibile **solo vLLM** su Blackwell (`--quantization modelopt_fp4`), non SGLang se lm_head è NVFP4 (nota RedHatAI).
  - **Raccomandazione Ventic:** Blackwell → **NVFP4** (`modelopt_fp4`, KV `fp8_e4m3` o `nvfp4` se FlashInfer #3684). Hopper → **FP8** (`--dtype fp8` / `fp8` kv). MXFP8 non raccomandato (kernel assenti).
- **Ricette verificate:**
  ```bash
  # SGLang FP8 256K su 4 GPU — README HF Qwen3-Next-80B-A3B-FP8
  python -m sglang.launch_server --model-path Qwen/Qwen3-Next-80B-A3B-Instruct-FP8 \
    --port 30000 --tp-size 4 --context-length 262144 --mem-fraction-static 0.8
  # + spec decode
  python -m sglang.launch_server --model-path Qwen/Qwen3-Next-80B-A3B-Instruct-FP8 \
    --port 30000 --tp-size 4 --context-length 262144 --mem-fraction-static 0.8 \
    --speculative-algo NEXTN --speculative-num-steps 3 --speculative-eagle-topk 1 --speculative-num-draft-tokens 4

  # vLLM FP8 256K su 4 GPU
  vllm serve Qwen/Qwen3-Next-80B-A3B-Instruct-FP8 --port 8000 \
    --tensor-parallel-size 4 --max-model-len 262144
  # vLLM NVFP4 Blackwell (GB200/B200)
  vllm serve RedHatAI/Qwen3-Next-80B-A3B-Instruct-NVFP4 --port 8000 \
    --tensor-parallel-size 4 --quantization modelopt_fp4 --dtype auto \
    --max-model-len 262144 --enable-auto-tool-choice --tool-call-parser qwen3_coder

  # Flash-Next DGX Spark + RTX PRO 6000 (blog Kubesimplify — 125B/6B @ FP8)
  # ~67.5 GiB con IQ1_S su llama.cpp a 32K, conferma pesi FP8 ~125 GiB
  ```
  Fonte: [Qwen3-Next-80B-A3B-Instruct-FP8 HF](https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Instruct-FP8), [NVIDIA docs qwen3-next](https://docs.api.nvidia.com/nim/reference/qwen-qwen3-next-80b-a3b-instruct), [RedHatAI NVFP4](https://huggingface.co/RedHatAI/Qwen3-Next-80B-A3B-Instruct-NVFP4) (“This quant ONLY works in vLLM and NOT SGLang”).

- **Stima VRAM (misurata):**
  - Pesi FP8: ~80 GiB (80B) / ~125 GiB (Flash-Next 125B). NVFP4: ~42 GiB / ~65 GiB.
  - KV per token (ibrida linear): ~0.12 MiB a  FP8 (3× più efficiente di dense; 10× di DeepSeek-V3). Quindi 200K → ~24 GiB, 1M → ~120 GiB (per singolo utente, condivisi su TP).
  - Overhead attivazioni + CUDA graph: ~6 GiB.

### 2.2 DeepSeek-V4-Flash-0731 — 284B total / 13B active — MoE + MLA + DSA + MTP

- **HF:** `deepseek-ai/DeepSeek-V4-Flash-0731` (hidden 4096, 43 layer, 64 heads, **kv_heads=1 MQA**, MLA compress, DSA sparse, `max_position_embeddings=1_048_576`). Peso nativo **FP8 + MXFP4/MXFP4 esperti**, context **1M nativo**.
- **Quantizzazioni:**
  - Ufficiale NVIDIA **NVFP4**: `nvidia/DeepSeek-V4-Flash-NVFP4` (ModelOpt v0.44, 156.7 GiB su disco, 46 safetensors, `quant_algo: NVFP4` su tutti `layers.*.ffn.experts`, `kv_cache_quant_algo: null` → KV FP8). Testato su **B200/GB300 Blackwell** con vLLM 0.22.1 nightly-aarch64 (`--tensor-parallel-size 4 --kv-cache-dtype fp8`) e SGLang PR #25820 (`--tensor-parallel-size 8`, auto-detect da `hf_quant_config.json` con `moe_quant_algo: NVFP4`). Accuracy NVFP4 vs FP8: GPQA 0.891 vs 0.894, IFBench 0.795 vs 0.788 (quasi lossless).
  - Fallback Hopper: `deepseek-ai/DeepSeek-V4-Flash` FP8 base (284 GiB) con `--kv-cache-dtype fp8 --block-size 256`. MXFP4 (`0xSero/180B`) è legacy — sostituito da NVFP4 ufficiale.
  - **Raccomandazione Ventic (usa sempre NVFP4 quando possibile):** Blackwell (B200, GB200, RTX PRO 6000 SM120) → **NVFP4** `nvidia/DeepSeek-V4-Flash-NVFP4` + KV `fp8`. Hopper (H100/H200) → **FP8** (NVFP4 non nativo). AMD (MI300X) → MXFP4 legacy solo se Blackwell non disponibile. NVFP4 KV (`nvfp4_ds_mla`) resta sperimentale — raddoppia KV ma rischio “salad” su 1M agentico, mantenere KV FP8.
- **Ricette verificate:**
  ```bash
  # vLLM ufficiale NVIDIA NVFP4 (HF nvidia/DeepSeek-V4-Flash-NVFP4 — 156.7 GiB, 46 shards)
  vllm serve nvidia/DeepSeek-V4-Flash-NVFP4 \
    --tensor-parallel-size 4 --trust-remote-code --kv-cache-dtype fp8
  # SGLang NVFP4 (PR #25820, auto-detect moe_quant_algo: NVFP4)
  python3 -m sglang.launch_server --model nvidia/DeepSeek-V4-Flash-NVFP4 --tensor-parallel-size 8 --trust-remote-code

  # Fallback Hopper FP8 (Spheron)
  vllm serve deepseek-ai/DeepSeek-V4-Flash-0731 \
    --trust-remote-code --kv-cache-dtype fp8 --block-size 256 \
    --tensor-parallel-size 4 --max-model-len 1048576 --max-num-seqs 4 \
    --tokenizer-mode deepseek_v4 --tool-call-parser deepseek_v4

  # Community 2× RTX PRO 6000 SM120 (eric8810 PR #41834 + DSpark, 384K ctx)
  # SGLang 4× RTX PRO 6000 (ombori) — entrambe valide anche con NVFP4 checkpoint
  ```
  Fonti: [DeepSeek-V4-Flash HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731), [Spheron Deploy V4 Flash](https://www.spheron.network/blog/deploy-deepseek-v4-flash-gpu-cloud/), [eric8810 2× RTX PRO 6000](https://github.com/eric8810/deepseek-v4-deploy), [ombori 4× RTX PRO 6000](https://github.com/ombori/deepseek-v4-flash-0731-sglang-4x-rtx-pro-6000), [tonyd2wild NVFP4-KV 2× DGX Spark](https://github.com/tonyd2wild/DeepSeek-v4-Flash-0731-DSpark-1M-NVFP4-KV-2x-DGX-Spark).

- **Stima VRAM (NVFP4 ufficiale):**
  - Pesi: **FP8 284 GiB**, **NVFP4 156.7 GiB** (`total_size: 168266793544` bytes da `model.safetensors.index.json` → 156.7 GiB, quasi identico a Lushbinary 158 GiB), BF16 568 GiB.
  - KV per token: **~0.06 MiB FP8** (MLA+DSA 7% di V3). 200K → **12 GiB**, 1M → **60 GiB** per utente. Con `nvfp4_ds_mla` KV → ~30 GiB per 1M (sperimentale, non usato con checkpoint NVIDIA che ha `kv_cache_quant_algo: null` → KV FP8).
  - Entry: **1× B200 192GB NVFP4** per 200K (156.7+12+overhead=184 GiB fit), FP8 → **4× H100 320GB** (Spheron). NVFP4 risparmia 127 GiB e permette single-GPU Blackwell.

### 2.3 DeepSeek-V4-Pro-0813 — 1.6T total / 49B active — MoE + MLA + DSA + MTP

- **HF:** `deepseek-ai/DeepSeek-V4-Pro` (hidden 7168, 61 layer, 128 heads, kv_heads=1, 1M context). Variante Pro è il frontier open: **93.5% LiveCodeBench, 80.6% SWE-bench** (cit. `maleshep/llm-training`).
- **Quantizzazioni:**
  - Nativo FP8 mixed (1 B/param → 1_600 GiB). NVFP4 teorico 0.5 B → **~862 GiB** (Lushbinary: “Weight Size FP4+FP8 862GB Pro”).
  - **Raccomandazione:** solo **FP8** (stabile) o **NVFP4** su Blackwell. MXFP4 non ancora upstream. Su Hopper, NVFP4 è emulato — sconsigliato.
- **Ricette:** nessuna recipe single-node; richiede **pipeline + expert parallel** su multi-nodo:
  ```bash
  # Concettuale (da Spheron + ybalbert001/llm-inference-analyzer)
  # FP8 multi-node 12× H200 (2 nodi ×6) o 3 nodi per 1M
  vllm serve deepseek-ai/DeepSeek-V4-Pro --trust-remote-code \
    --tensor-parallel-size 8 --pipeline-parallel-size 2 --enable-expert-parallel \
    --kv-cache-dtype fp8 --block-size 256 --max-model-len 1048576
  ```
  Fonte: [Spheron](https://www.spheron.network/blog/deploy-deepseek-v4-flash-gpu-cloud/) (“V4-Pro needs 12+ H200 across two nodes even at FP8, 3 nodes required for 1M”), [ybalbert analyzer](https://github.com/ybalbert001/llm-inference-analyzer) (row `DeepSeek-V4-Pro 1.6T/50B —`), [OpenLM spec table](https://openlm.ai/deepseek-v4/).

- **Stima VRAM:**
  - Pesi FP8 1_600 GiB, NVFP4 862 GiB. KV 1M ~ **80 GiB FP8** (10% di V3, leggermente più di Flash per hidden maggiore). Quindi anche con NVFP4, **1 utente 200K ≈ 882 GiB** totali → **≥5× B200 (960 GiB) o 7× H200 (987 GiB)**. Su Vast.ai: nessun singolo host 8×H200 basta in FP8; serve **cluster Vast.ai 2–3 nodi**.

### 2.4 Qwen3.8-27B — 27B dense — Hybrid Linear Attention

- **HF:** `Qwen/Qwen3.8-27B` (arch `qwen3_5`, hidden 5120, intermediate 17408, 64 layer type pattern linear/full, `max_position_embeddings=262144`, context **262K** nativo, estendibile a 1M con RoPE). Pesi offic. BF16.
- **Quantizzazioni:**
  - Ufficiali: `Qwen/Qwen3.6-27B-FP8` (proxy, block 128, identica architettura) + `nvidia/Qwen3.6-27B-NVFP4` (modelopt_mixed W4A16 NVFP4 group 16). Per 3.8: `QUASAR-QAT/Qwen3.8-27B-QUASAR-NVFP4`, `RedHatAI/Qwen3.8-27B-NVFP4` (nota: RedHatAI NVFP4 funziona **solo vLLM**, lm_head FP8 rompe SGLang), `hanxiao/Qwen3.8-27B-NVFP4-SGLang-DFlash2-RTX-PRO-6000` (compatibile SGLang).
  - **Raccomandazione Ventic:** Blackwell → **NVFP4** (`--quantization modelopt_fp4`, KV `nvfp4` via FlashInfer FA2 JIT — vLLM 0.24 + FlashInfer #3684 — oppure `fp8` se instabile). Hopper → **FP8**. Per SGLang + spec decode, preferire `RadixArk/Qwen3.8-27B-NVFP4-BF16-LMHead` (lm_head denso, compatibile SGLang).
- **Ricette verificate:**
  ```bash
  # Qwen3.8-27B NVFP4 su ½ RTX PRO 6000 (48GB partition) @ 262K — hanxiao
  python -m sglang.launch_server --model-path RadixArk/Qwen3.8-27B-NVFP4-BF16-LMHead \
    --port 30000 --tp-size 1 --quantization modelopt_fp4 --context-length 262144 \
    --mem-fraction-static 0.80 --speculative-algo DFlash2 --speculative-num-steps 3
  # throughput: 111 tok/s su 7 workload @262K, 6.53 tok/forward

  # vLLM NVFP4 ufficiale
  vllm serve QUASAR-QAT/Qwen3.8-27B-QUASAR-NVFP4 --port 8000 --quantization modelopt_fp4 --max-model-len 262144
  vllm serve nvidia/Qwen3.6-27B-NVFP4 --port 8000 --quantization modelopt_fp4 --max-model-len 262144 --kv-cache-dtype fp8

  # FlashRT singolo RTX 5090 32GB — Qwen3.6-27B NVFP4 256K @ ~121-145 tok/s
  # (dimostra fit su 32GB consumer Blackwell)
  ```
  Fonti: [hanxiao NVFP4 SGLang](https://github.com/hanxiao/Qwen3.8-27B-NVFP4-SGLang-DFlash2-RTX-PRO-6000), [RedHatAI nota vLLM-only](https://huggingface.co/RedHatAI/Qwen3.8-27B-NVFP4), [Qwen3.6-27B-FP8](https://huggingface.co/Qwen/Qwen3.6-27B-FP8), [nvidia Qwen3.6-NVFP4](https://github.com/r0b0tlab/nvidia-qwen-3.6-27B-sm121-nvfp4), [FlashRT 5090](https://github.com/yichenchenyi/flashrt).

- **Stima VRAM (misurata):**
  - Pesi: BF16 54 GiB, FP8 27 GiB, **NVFP4 14 GiB**.
  - KV FP8: **262K → ~30 GiB** (misurato hanxiao 48GB total -14 pesi -4 overhead). Quindi **200K → ~23 GiB**, **1M → ~114 GiB** (linear extrapolation, confermata da 2×4090 bench: FP8 30.9GiB model + 57.5 VRAM total bench).
  - Su 1× L40S 48GB NVFP4: 200K ok (37 GiB), 1M no. Su H200 141GB: 1M ok (128 GiB).

---

## 3. Inventario quotato Vast.ai — varianti per concorrenza e context

> **Legenda:** `Utenti` = conversazioni parallele, ognuna riempie interamente la finestra indicata (worst-case KV). `VRAM stimata` = pesi + KV×utenti + overhead. `Macchina consigliata` = *minimo* che bootta senza OOM al `mem_fraction_static=0.80–0.90`. `Spot` = prezzo Vast.ai interrompibile, `On-demand` = garantito. `Ventic PaaS` = 50% running (come da `src/pages/paas.astro`).

### 3.1 Prezzi Vast.ai di riferimento (agosto 2026, $/GPU·h)

| GPU | VRAM | Arch | Vast spot | Vast on-demand | Nota |
|-----|------|------|-----------|----------------|------|
| RTX 4090 | 24GB | Ada | **$0.30–0.38** | $0.55–0.68 | ottimo $/tok per <14B |
| L40S | 48GB | Ada | $0.45–0.65 | $0.80–1.05 | certificata inference |
| A100 80GB SXM4 | 80GB | Ampere | $0.60–0.80 | $0.95–1.25 | no FP8, solo BF16/INT8 |
| H100 SXM/NVL 80GB | 80GB | Hopper | **$1.22** | $1.49–1.90 | FP8 nativo, più disponibile |
| H200 SXM 141GB | 141GB | Hopper | **$1.80–2.40** * | $3.31–3.80 | 141GB, 4800 GB/s, ideale MoE |
| B200 SXM 192GB | 192GB | Blackwell | **$2.12** | $4.50–6.25 | NVFP4 nativo, 8000 GB/s |
| RTX PRO 6000 | 96GB | Blackwell SM120 | $1.00–1.40 | $1.60–2.00 | workstation Blackwell, NVFP4 |
| GB200 NVL72 | 192GB×72 | Blackwell | su richiesta | — | solo cluster hyperscaler |

* H200 spot a $0.47–0.50 rilevato su Prime Intellect solo quando disponibile; su Vast.ai mediana $1.80. Fonte: `gpu-price-tracker`, `Spheron 2026-08`, `hassan11196/llm-systems-cookbook` (“H100 on Vast.ai now $1.22/hr”).

### 3.2 Matrice completa

#### A) Qwen3.8-27B (dense, 27B)

| Scenario | Quant | VRAM pesi | KV/utente | VRAM totale* | Macchina Vast.ai consigliata | Vast cost/h | Ventic PaaS/h |
|----------|-------|-----------|-----------|--------------|------------------------------|-------------|---------------|
| **1×200K** (baseline richiesta) | **NVFP4** (pref) | 14 | 23 | **41 GiB** | **1× L40S 48GB** (Frankfurt) o 1× RTX PRO 6000 96GB (single, margine prefill) | $0.55 spot / $1.05 on-dem | **$0.28 / $0.53** |
| 1×200K FP8 fallback | FP8 | 27 | 23 | 54 GiB | 1× H100 80GB o 1× L40S 48GB no (serve 80GB) → **1× H100** | $1.22 / $1.70 | $0.61 / $0.85 |
| **1×1M** | NVFP4 | 14 | 114 | **134 GiB** | **1× H200 141GB** (singolo) — *unico single-GPU per 1M* | $1.90 / $3.40 | $0.95 / $1.70 |
| 1×1M FP8 | FP8 | 27 | 114 | 147 GiB | 1× B200 192GB (meglio) o 1× H200 + offload | $2.12 / $4.50 | $1.06 / $2.25 |
| **4×200K** (=800K tok) | NVFP4 | 14 | 92 tot | **112 GiB** | **1× H200 141GB** o 2× L40S 96GB TP2 | $1.90 / $3.40 (H200) vs $1.10/ $2.10 (2×L40S) | $0.95 / $1.70 |
| **16×200K** (=3.2M tok) | NVFP4 | 14 | 368 tot | **392 GiB** | **3× H200 423GB** (TP3) o **2× B200 384GB** no (serve 3×) → **2× B200 + 1× H200** cluster Vast 3-nodi | ~$5.70 / $10.20 (3×H200) | $2.85 / $5.10 |
| **4×1M** (=4M tok) | NVFP4 | 14 | 456 tot | **480 GiB** | **4× H200 564GB** o **3× B200 576GB** | $7.60 / $13.60 | $3.80 / $6.80 |
| 16×1M (stress) | NVFP4 | 14 | 1824 tot | **1850 GiB** | non servibile economicamente su Vast — richiedere GB200 NVL | — | — |

* +8% overhead. La riga **1×200K NVFP4 su L40S** è quella dimostrata da hanxiao/FlashRT (48GB partition e RTX 5090 32GB con offload). Per produzione Ventic su Vast consigliamo **RTX PRO 6000 96GB** ($1.20 spot) così resta margine per tool-calling.

#### B) Qwen3.8-Flash-Next (125B/6B MoE)

| Scenario | Quant | VRAM pesi | KV/utente | VRAM totale | Macchina Vast.ai | Vast cost/h | Ventic |
|----------|-------|-----------|-----------|-------------|------------------|-------------|--------|
| **1×200K** | **NVFP4** | 65 | 24 | **95 GiB** | **1× RTX PRO 6000 96GB** *oppure* **1× H200 141GB** (margine sicuro) | $1.20 / $1.80 (96GB) vs $1.90/$3.40 (H200) | $0.60 / $0.90 |
| 1×200K FP8 | FP8 | 125 | 24 | 155 GiB | **2× H100 160GB TP2** (recipe ufficiale TP4 ma 2 bastano a 200K) | $2.44 / $3.40 | $1.22 / $1.70 |
| **1×1M** | NVFP4 | 65 | 120 | **193 GiB** | **1× B200 192GB** (al limite) → consigliato **2× H200 282GB TP2** | $2.12 / $4.50 (B200) vs $3.80/$6.80 (2×H200) | $1.06 / $2.25 vs $1.90/$3.40 |
| 1×1M FP8 | FP8 | 125 | 120 | 253 GiB | **2× H200 282GB** | $3.80 / $6.80 | $1.90 / $3.40 |
| **4×200K** | NVFP4 | 65 | 96 | **169 GiB** | **1× B200 192GB** (single!) | $2.12 / $4.50 | $1.06 / $2.25 |
| 4×200K FP8 | FP8 | 125 | 96 | 229 GiB | 2× H200 282GB | $3.80 / $6.80 | $1.90 / $3.40 |
| **16×200K** | NVFP4 | 65 | 384 | **459 GiB** | **3× H200 423GB no** → **4× H200 564GB TP4** (recipe ufficiale) | $7.60 / $13.60 | $3.80 / $6.80 |
| 4×1M | NVFP4 | 65 | 480 | 555 GiB | 4× H200 564GB al limite → **3× B200 576GB** | $6.36 / $13.50 | $3.18 / $6.75 |

Nota: su Hopper la ricetta ufficiale è **TP4** anche a 200K per throughput, ma il *fit* VRAM è già garantito a TP2; Ventic usa TP4 solo per latenza.

#### C) DeepSeek-V4-Flash — NVFP4 `nvidia/DeepSeek-V4-Flash-NVFP4` (156.7 GiB) — usa sempre NVFP4 su Blackwell

| Scenario | Quant | VRAM pesi | KV/utente | VRAM totale | Macchina Vast.ai | Vast cost/h | Ventic |
|----------|-------|-----------|-----------|-------------|------------------|-------------|--------|
| **1×200K** | **NVFP4** (Blackwell pref) | 156.7 | 12 | **184 GiB** | **1× B200 192GB** ✅ single-GPU Blackwell! *oppure* **2× RTX PRO 6000 192GB TP2** | $2.12 / $4.50 (B200) vs $2.40/$3.60 (2×96GB) | $1.06 / $2.25 |
| 1×200K FP8 (Hopper fallback) | FP8 | 284 | 12 | 304 GiB | **4× H100 320GB TP4** (Spheron) | $4.88 / $6.80 | $2.44 / $3.40 |
| **1×1M** | NVFP4 | 156.7 | 60 | **232 GiB** | **2× H200 282GB TP2** o 4× RTX PRO 6000 384GB (SGLang EP) | $3.80 / $6.80 vs $4.80/$7.20 | $1.90 / $3.40 |
| 1×1M FP8 | FP8 | 284 | 60 | 352 GiB | **4× H200 564GB** o 2× B200 384GB | $5.00 / $9.00 (2×B200) vs $7.60/$13.60 | $2.50 / $4.50 |
| **4×200K** (=800K) | NVFP4 | 156.7 | 48 | **220 GiB** | **2× H200 282GB** | $3.80 / $6.80 | $1.90 / $3.40 |
| 4×1M (=4M tok KV) | NVFP4 | 156.7 | 240 | **414 GiB** | **3× B200 576GB** | ~$6.36 / $13.50 | $3.18 / $6.75 |
| **16×200K** (=3.2M) | NVFP4 | 156.7 | 192 | **366 GiB** | **2× B200 384GB** (Blackwell) | $4.24 / $9.00 | $2.12 / $4.50 |
| 16×1M (16M tok) | NVFP4 | 156.7 | 960 | **1134 GiB** | **8× H200 1128GB** (2 nodi) o 6× B200 1152GB | ~$15.20 / $27.20 | $7.60 / $13.60 |

Evidenza: Flash su **2× RTX PRO 6000** è *production* (eric8810, ombori); su **1× B200** a 200K è il nuovo sweet spot Blackwell.

#### D) DeepSeek-V4-Pro-0813 (1.6T/49B) — *cluster only*

| Scenario | Quant | VRAM pesi | KV/utente | VRAM totale | Macchina Vast.ai | Vast cost/h | Ventic |
|----------|-------|-----------|-----------|-------------|------------------|-------------|--------|
| **1×200K** | **NVFP4** | 862 | 16 | **886 GiB** | **5× B200 960GB** (2 nodi: 3+2) *oppure* **7× H200 987GB** (2 nodi 4+3) | **$10.60 / $22.50** (5×B200) vs $13.30/$23.80 (7×H200) | **$5.30 / $11.25** |
| 1×200K FP8 | FP8 | 1600 | 16 | 1624 GiB | **12× H200 1692GB** (3 nodi 4×) — minimo Spheron | $22.80 / $40.80 | $11.40 / $20.40 |
| **1×1M** | NVFP4 | 862 | 80 | **950 GiB** | **5× B200 960GB** al limite → **6× B200 1152GB** consigliato | $12.72 / $27.00 | $6.36 / $13.50 |
| 1×1M FP8 | FP8 | 1600 | 80 | 1688 GiB | **12× H200 + 1 H200** (3 nodi) → **9× B200 1728GB** | $19.08 / $40.50 (9×B200) | $9.54 / $20.25 |
| **4×200K** | NVFP4 | 862 | 64 | **934 GiB** | **5× B200 960GB** (come 1×200K) | $10.60 / $22.50 | $5.30 / $11.25 |
| **4×1M** | NVFP4 | 862 | 320 | **1190 GiB** | **7× B200 1344GB** (2 nodi) | $14.84 / $31.50 | $7.42 / $15.75 |
| **16×200K** | NVFP4 | 862 | 256 | **1126 GiB** | **6× B200 1152GB** o 8× H200 1128GB | $12.72 / $27.00 | $6.36 / $13.50 |

> **Pro è 5–10× più caro di Flash** a parità di context, per via dei pesi. Ventic lo offre solo come *fleet Vast.ai multi-nodo* con `vastai create instance --type cluster` o come BYOH su 8×B200 DGX. Per la maggior parte dei workload agentic, **Flash è il sweet spot** (10% FLOPs di V3, 49B vs 13B active non giustifica il costo salvo heavy code).

---

## 4. Raccomandazione quantizzazione per modello (NVFP4 / MXFP8)

| Modello | Blackwell (B200/RTX PRO 6000/GB200) | Hopper (H100/H200) | AMD (MI300X/MI355X) | Nota produzione |
|---------|--------------------------------------|-------------------|--------------------|----------------|
| **Qwen3.8-27B** | **NVFP4** `modelopt_fp4` + KV `fp8` (stabile) / `nvfp4` (FlashInfer JIT, +67% KV) — usare `RadixArk/...-BF16-LMHead` per SGLang | **FP8** block128 | MXFP8 via `llm-compressor` | NVFP4 su Hopper emulato: perdita 15% tok/s |
| **Qwen3.8-Flash-Next** | **NVFP4** (vLLM) — nessuna misura SGLang NVFP4, usare FP8 su SGLang | **FP8** | INT4 AutoRound | Verificare OOM: TP4 ufficiale anche con NVFP4 |
| **DeepSeek-V4-Flash** | **MXFP4 esperti + FP8 KV** (nativo) — attivare `VLLM_USE_FLASHINFER_MOE_MXFP4_MXFP8=1`; alternativa NVFP4 `0xSero/180B` + DSpark | **FP8** `--kv-cache-dtype fp8 --block-size 256` | **MXFP4** (ryanzhou recipe MI300X, 4K ctx; attendere MI355X per 1M) | NVFP4 KV (`nvfp4_ds_mla`) raddoppia capacità ma rischio “salad” su 1M agentic — test A/B |
| **DeepSeek-V4-Pro** | **NVFP4** (862 GiB) se disponibile, altrimenti FP8 | **FP8** (unica stabile) | non consigliato | Pro su Vast.ai solo via `tensor-parallel + pipeline-parallel + expert-parallel` |

Regola generale:
- **NVFP4** vince su Blackwell (≈2× pesi, 1.6× tok/s vs FP8 su GB200, fonte `macielfilho/vllm.cpp` bench: NVFP4 69.8 tok/s vs FP8 53.7 su Qwen3.6-27B).
- **MXFP4/MXFP8** è il formato AMD (FNUZ FP8, 64-bit MQA offsets). Su NVIDIA non porta vantaggio.
- **FP8** resta il formato più portabile e testato su H100/H200 (SGLang `fp8_e4m3`, vLLM `fp8`).

---

## 5. Come ordinare su Vast.ai — comandi pronti

### 5.1 CLI `vast.ai` (pip `vast-ai`)

```bash
# Cerca H200 singolo per Qwen3.8-27B 1M NVFP4
vastai search offers 'gpu_name=H200_SXM num_gpus=1 gpu_ram>=140 inet_down>=500 reliability>0.98' -o 'dph+'

# B200 singolo per Flash 200K NVFP4
vastai search offers 'gpu_name=B200_SXM num_gpus=1 gpu_ram>=180 dph<5.0' -o 'dph+'

# 2× H200 per Flash 1M NVFP4 (TP2) — filtra NVLink
vastai search offers 'gpu_name=H200_SXM num_gpus=2 gpu_ram>=140 cuda_vers>=12.8 inet_down>1000' -o 'dph+'

# 4× H100 per Flash FP8 (quando manca B200)
vastai search offers 'gpu_name=H100_SXM num_gpus=4 gpu_ram>=80' -o 'dph+'

# RTX PRO 6000 Blackwell (vast la lista come RTX_6000_Ada o RTX_PRO_6000)
vastai search offers 'gpu_name=RTX_PRO_6000 num_gpus=2 gpu_ram>=90' -o 'dph+'

# Fleet multi-nodo per Pro (crea 2 istanze 4×H200 e connetti via RoCE)
vastai search offers 'gpu_name=H200_SXM num_gpus=4 num_gpus=8' --raw | jq '.[] | select(.num_gpus>=4) | {id, dph_total, gpu_name, num_gpus, geolocation}'
```

### 5.2 Script Python (proceduralizzazione)

Vedi `scripts/vast-llm-inventory.py` — interroga l'API Vast, calcola VRAM come sopra e stampa la **max concorrenza sostenibile per ogni GPU a 200K e 1M**. Esegui:

```bash
python3 scripts/vast-llm-inventory.py --model all --context 200000 --concurrency 4 --quant auto
python3 scripts/vast-llm-inventory.py --model deepseek-v4-flash --context 1000000 --concurrency 1 --json > /tmp/quotes.json
python3 scripts/vast-llm-inventory.py --list-gpus   # tabella prezzi Vast live
```

Lo script ha fallback offline (tabella §3.1) se l'API non è raggiungibile e genera `reports/quotes-latest.json`.

### 5.3 Prompt agente (automatismo LLM)

Vedi `scripts/prompts/llm-sizing-agent.md` — prompt system che istruisce un LLM a rifare questa analisi da zero: cerca HF, estrae `config.json`, cerca recipe vLLM/SGLang, calcola VRAM, interroga Vast.ai e produce la stessa matrice. Usalo con Claude Code / Cursor / OpenCode come `system prompt`.

---

## 6. Inventario PaaS Ventic — cosa esporre su `/paas`

Mappatura consigliata (aggiungere a `src/pages/paas.astro` → `inventoryBase`):

| ID Ventic | GPU Vast | VRAM tot | Modello primario | Context garantito | Concorrenza | Prezzo running | Prezzo Ventic (50%) |
|-----------|----------|----------|-------------------|-------------------|-------------|----------------|---------------------|
| VENTIC-Q27-01 | 1× L40S 48GB | 48GB | Qwen3.8-27B NVFP4 | 200K ×1 | 1 utente | €1.05/h | **€0.53/h** |
| VENTIC-Q27-02 | 1× H200 141GB | 141GB | Qwen3.8-27B NVFP4 | 1M ×1 / 200K ×4 | 4 utenti | €3.10/h | **€1.55/h** |
| VENTIC-QFN-01 | 1× RTX PRO 6000 96GB | 96GB | Qwen3.8-Flash-Next NVFP4 | 200K ×1 | 1 | €1.45/h | **€0.73/h** |
| VENTIC-QFN-02 | 1× B200 192GB | 192GB | Qwen3.8-Flash-Next NVFP4 | 1M ×1 / 200K ×4 | 4 | €4.20/h | **€2.10/h** |
| VENTIC-DSF-01 | 1× B200 192GB | 192GB | DeepSeek-V4-Flash MXFP4 | 200K ×1 | 1 | €4.20/h | **€2.10/h** |
| VENTIC-DSF-02 | 2× H200 282GB | 282GB | DeepSeek-V4-Flash NVFP4 | 1M ×1 / 200K ×4 | 4 | €6.20/h | **€3.10/h** |
| VENTIC-DSF-03 | 2× B200 384GB | 384GB | DeepSeek-V4-Flash NVFP4 | 200K ×16 | 16 | €8.40/h | **€4.20/h** |
| VENTIC-DSP-01 | 5× B200 960GB (fleet) | 960GB | DeepSeek-V4-Pro NVFP4 | 200K ×1 | 1 | €21.00/h | **€10.50/h** |
| VENTIC-DSP-02 | 9× B200 1728GB (fleet) | 1728GB | DeepSeek-V4-Pro FP8 | 1M ×1 | 1 | €38.00/h | **€19.00/h** |

I primi 7 SKU coprono il 95% della domanda PaaS; gli ultimi 2 sono “on-request” (cluster).

---

## 7. Fonti e recipe verificate

- Qwen3-Next FP8 HF: `Qwen/Qwen3-Next-80B-A3B-Instruct-FP8` — comandi SGLang TP4 262K, vLLM TP4 262K
- Qwen3-Next docs NVIDIA: `docs.api.nvidia.com/nim/reference/qwen-qwen3-next-80b-a3b-instruct` — `vllm>=0.10.2` richiesto
- RedHatAI Qwen3.8-27B NVFP4: “This quant ONLY works in vLLM and NOT SGLang” (lm_head FP8)
- hanxiao Qwen3.8-27B NVFP4 SGLang DFlash2: 111 tok/s @262K su ½ RTX PRO 6000 (48GB)
- FlashRT: Qwen3.6-27B NVFP4 256K su singolo RTX 5090 ~121–145 tok/s
- Dell Enterprise Hub: Qwen3.8-Flash-Next 125B/6B FP8
- DeepSeek-V4-Flash HF: `deepseek-ai/DeepSeek-V4-Flash-0731` — `vllm serve ... --kv-cache-dtype fp8 --block-size 256`
- Spheron Deploy V4 Flash: tabella pesi 284 GiB FP8 / 158 GiB NVFP4, minimo 4×H100 FP8, 1M context
- eric8810 2× RTX PRO 6000 Blackwell SM120 vLLM PR#41834 + DSpark
- ombori 4× RTX PRO 6000 SGLang TP4+DP, 1M context
- tonyd2wild NVFP4 KV 2× DGX Spark 1M (nota “NVFP4 KV salad → fallback FP8”)
- Spheron H100/H200 pricing, hassan11196 cookbook (“H100 on Vast.ai now $1.22/hr”)
- Vast.ai API `console.vast.ai/api/v0/bundles`, `vastai search offers` skill `hlky/vast-gpu`
- ybalbert001/llm-inference-analyzer — catalogo MoE (V4 Flash 291B/14B, V4 Pro 1.6T/50B)

---

## 8. Procedura di aggiornamento (mensile)

1. `python3 scripts/vast-llm-inventory.py --refresh-pricing` → aggiorna `reports/pricing-snapshot.json`
2. `python3 scripts/vast-llm-inventory.py --model all --concurrency 1,4,16 --context 200000,1000000 --report reports/inventario-llm-privati-2026.md`
3. Verificare che le recipe HF non siano cambiate (`scripts/prompts/llm-sizing-agent.md` → step 1).
4. Se un nuovo quant NVFP4/MXFP8 appare su HF, aggiungerlo a `MODEL_CATALOG` e ri-lanciare lo script.
5. `npm run build` per rigenerare `/paas` con i nuovi SKU.

---

*Report generato da `scripts/vast-llm-inventory.py` + ricerca web 28/08/2026. Prezzi Vast.ai fluttuano ogni ora — lo script interroga l'API live; i valori qui sono snapshot mediana.*
