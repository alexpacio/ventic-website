# Aggiornamento v2 — Filtri geografici, datacenter e verifica host

**Data:** 28/08/2026 v2 · **Script:** `scripts/vast-llm-inventory.py` v2.0

## Novità richieste

1. **Filtro provenienza** — `--region EU` (tutti i paesi EU+CH/NO/GB) o `--country IT,DE,FR` (ISO 3166-1 alpha-2, anche lista e nomi estesi "Italy, Germany"). Parsa `geolocation` Vast (`"Milan, IT"`, `"Frankfurt, DE"`). EU = `EU_COUNTRIES` (33 codici).
2. **Filtro datacenter** — `--datacenter true` (solo `hosting_type==1`), `false` (solo host residenziali), `any` (default). Vast espone `hosting_type` 0/1; il flag è quello usato da `vastai search offers 'datacenter=true'` via SDK Go (`skypilot`, `cozy-creator/vast-ai-go-sdk`). Fallback: `RTX PRO 6000` è `hosting_type 0` (workstation), `B200/H200/H100` sono `1` (datacenter).
3. **Verifica adeguatezza host** — per ogni modello/context/concorrenza calcola requisiti minimi e verifica ogni offerta:
   - `cpu_ram_gb`: max(base, `weights*1.2 + kv*0.6 + 32GB`) — es. Qwen27B 64GB, Flash-Next 128GB, Flash 256GB, Pro 512GB+ (scala fino a 1070GB per Pro 200K)
   - `cpu_cores`: `max(base, 8+conc*4)` — 16/32/64 base
   - `disk_gb`: `max(base, weights*2.5+120GB)` — 250/600/900/2000GB base
   - `inet_mbps`: 300/500/800/1000 base
   - `reliability`: 0.98/0.985/0.99/0.99 base, overridabile con `--min-reliability 0.99`
   - `verification`: se `--require-verified`, solo `verified`
   - Se l'host non soddisfa, viene scartato e il motivo è riportato in `host_reasons` (es. `RAM 256GB < 512GB`).
   - Per fleet (Pro), le risorse sono aggregate su `ceil(n/4)` nodi (es. 5× B200 su 2 nodi → 2048GB RAM, 128 cores).
4. **Costo rete** — ogni offerta Vast riporta `internet_down_cost_per_tb` / `internet_up_cost_per_tb` (es. `2.67↓ $4.00↑ /TB` per H100 FR, `0.8↓ $1.5↑ /TB` per B200 IT). Lo script calcola `estimate_network_cost(down_per_tb*TB_down + up_per_tb*TB_up)` con default `--monthly-tb-down 10 --monthly-tb-up 10` (overridabile). Ritornato in `net_cost` e mostrato con `--show-host` come `$23/mese per 10TB↓/10TB↑`. In `--json` è in `machine.net_cost`. Da sommare al running per TCO (Total Cost of Ownership).

## Esempi CLI

```bash
# Solo EU, solo datacenter, 200K, mostra dettaglio host + rete
python3 scripts/vast-llm-inventory.py --model all --context 200000 --concurrency 1 --region EU --datacenter true --show-host

# Solo Italia (Milan, IT) — fallback catalog ha IT, live oggi ha 0 offerte IT (finestra temporale)
python3 scripts/vast-llm-inventory.py --model qwen3.8-27b --context 200000 --concurrency 1 --country IT --show-host

# Solo Francia datacenter, con costo rete per 50TB down / 20TB up
python3 scripts/vast-llm-inventory.py --list-gpus --region EU --country FR --datacenter true --min-reliability 0.99
python3 scripts/vast-llm-inventory.py --model deepseek-v4-flash --context 1000000 --concurrency 1 --country FR --datacenter true --monthly-tb-down 50 --monthly-tb-up 20 --show-host --live

# Verifica severe host (es. richiedi 2000GB RAM → nessun host passa)
python3 scripts/vast-llm-inventory.py --model qwen3.8-27b --context 200000 --concurrency 1 --min-cpu-ram 2000 --show-host

# Filtro combinato: EU IT+DE, solo verified, live offers
python3 scripts/vast-llm-inventory.py --model all --context 200000,1000000 --concurrency 1,4 --country IT,DE --require-verified --min-reliability 0.985 --live --json > reports/quotes-eu-live.json
```

## Risultati snapshot 28/08/2026 (fallback catalog, 8 GPU tipiche)

| Filtro | Qwen27B 200K NVFP4 (35G) | Flash-Next 200K (92G) | Flash 200K MXFP4 (191G) | Pro 200K (949G) |
|--------|-------------------------|------------------------|--------------------------|------------------|
| **nessuno** | 1× RTX PRO 6000 IT $1.20 (hosting 0, 256GB RAM, 1200GB disk, 0.99) | 1× RTX PRO 6000 IT $1.20 | 1× B200 IT $2.12 (1024GB RAM, 2500GB disk) | 5× B200 fleet $10.60 (2048GB RAM agg.) |
| **EU datacenter true** | 1× B200 IT $2.12 (datacenter, 1024GB RAM) | 1× B200 IT $2.12 | 1× B200 IT $2.12 | 5× B200 fleet $10.60 |
| **IT** | 1× RTX PRO 6000 IT $1.20 | 1× RTX PRO 6000 IT $1.20 | 1× B200 IT $2.12 | 5× B200 fleet $10.60 |
| **live EU datacenter true** (snapshot 64 offerte) | solo 2 offerte FR H100 SXM (79/159GB) — nessuna 24/48GB EU live | — | — | — |

Il fallback EU rimane economico (IT Milan, DE Frankfurt, FR Paris), il live EU è attualmente povero (solo FR H100), confermando che **per IT/Milan serve prenotare su Vast con filtro `--country IT` e attendere disponibilità**, altrimenti usare EU DE/FR.

## Costo rete snapshot

- B200 IT: `$0.8/TB ↓ + $1.5/TB ↑` → **$23/mese per 10TB↓/10TB↑** (default), `$138/mese per 50TB↓/20TB↑`
- RTX PRO 6000 IT: `$2.0 + $3.0` → **$50/mese per 10+10TB**
- H100 FR live: `$2.67 + $4.00` → **$66.67/mese per 10+10TB**

Il costo rete è **fuori dal `dph_total`** Vast (che include solo GPU+storage); va sommato al TCO.

## File aggiornati

- `scripts/vast-llm-inventory.py` v2 (587 righe, +201 righe)
- `scripts/prompts/llm-sizing-agent.md` (da aggiornare con Step 3 filtrato)
- `reports/pricing-snapshot.json` (refresh `--refresh-pricing` ora salva 150 offerte)
