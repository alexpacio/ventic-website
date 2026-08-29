# Ventic PaaS — Knowledge Base Interna (NON PUBBLICA)

> **Riservato — non esporre su sito, contratti o comunicazioni pubbliche.**  
> Ultimo aggiornamento: 2026-08-28

## Markup e formula prezzo

- **Markup PaaS:** `PaaS = running_cost * 1.50`  → **+50% sul running cost orario del server**.
- `running_cost` = costo orario Vast.ai spot/on-demand del/dei server (es. B200 192GB `$2.12/h`, H200 141GB `$1.90/h`, MI300X `$2.99/h`, A100 80GB `$0.70/h`).
- `ventic_hourly = running_hourly * 0.50`? **No — ventic_hourly = running_hourly * 0.50 è solo per display interno “tu paghi” vs “running” — in fattura si fattura `running + 50% fee` = `1.5 × running`.**
- Esempio pubblico sanitizzato (mostrare solo PaaS): `B200 2× → running $3.64/h → PaaS $1.82/h` è **esplicitamente 50%** — non mostrare mai `running` al cliente. Mostrare solo `PaaS $1.82/h` o `€1310/mese su 720h`.
- **Conversione EUR:** `EUR = USD * 0.8589` (Frankfurter ECB). Esempio 720h/mese: `PaaS $1.82/h *720 = $1310 → €1125` (+IVA).

## Esempi interni (non pubblicare formula)

| Pacchetto | GPU | Running USD/h | PaaS USD/h (50%) | PaaS EUR/h | 720h/mese PaaS EUR |
|-----------|-----|---------------|------------------|------------|-------------------|
| Qwen 27B 200K×4 | 1× A100 80GB | $0.70 | $0.35 | €0.30 | €216 |
| Qwen 27B 1M×4 | 1× B200 192GB | $2.12 | $1.06 | €0.91 | €655 |
| Qwen Flash Next 200K×4 | 1× H200 141GB | $1.90 | $0.95 | €0.82 | €590 |
| Qwen Flash Next 1M×4 | 2× H200 | $3.80 | $1.90 | €1.63 | €1174 |
| **DeepSeek Flash MI300X** | 1× MI300X 192GB | $2.99 | $1.495 | €1.28 | €922 |
| DeepSeek Flash 200K×4 | 1× B200 | $2.12 | $1.06 | €0.91 | €655 |
| DeepSeek Flash 1M×4 | 2× B200 | $4.24 | $2.12 | €1.82 | €1310 |
| DeepSeek Pro Fleet 5× B200 | 5× B200 | $10.60 | $5.30 | €4.55 | €3276 |

## Dove è sanitizzato (pubblico)

- `src/i18n/ui.ts`: `modes.paas.price`, `pricing.paas.price`, `feeDesc`, `suffix` → ora dicono “PaaS” / “all-inclusive” / “Esempio: B200 2× → €1310 + IVA” senza mostrare running.
- `src/pages/paas.astro` e `src/pages/en/paas.astro`: mailto ora “PaaS €X + IVA — Esempio … (all-inclusive)” senza “(50% running cost)”.
- `src/pages/calculator.astro`, `en/calculator.astro`, `inventario.astro`: rimosso “Ventic = 50% Vast.ai”.

## Regole comunicazione pubblica

- Mai citare “50%”, “markup”, “fee del 50%”, “running cost”.
- Dire: “Prezzo PaaS all-inclusive”, “Include server + setup vLLM + Ventic Agent”, “Fatturato da noi + IVA”.
- Esempio pubblico ammesso: “B200 2×, 720h/mese → €1310 + IVA, tutto incluso.”

## File tecnici con formula (non deployati)

- `scripts/vast-llm-inventory.py`: `ventic = running *0.5` per calcolo interno, non esposto in UI.
- `src/components/CostCalculator.tsx`: `ventic_spot = spot *0.5` interno.

## Aggiornamento

Quando aggiorni `GPU_CATALOG` o `spot_dph`, ricalcola tabella sopra e aggiorna solo questo file. Non committare mai questo file in repo pubblico se il repo diventa open.
