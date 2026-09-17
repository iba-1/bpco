# 05 — Verification & Validation

> Placeholder. Evidenza di test per il Technical File (IEC 62304 unit/integration/system). Le evidenze vengono prodotte dalla pipeline (T01) e vivono in `../evidence/`.

## Livelli di verifica

| Livello | Prodotto da | Dove vive |
|---|---|---|
| Unit test | `ci.yml` → `npm run test` / `test:ci` | `../evidence/test-reports/` |
| Typecheck | `ci.yml` → `npm run typecheck` | report CI |
| Lint | `ci.yml` → `npm run lint` | report CI |
| Integration / E2E | *da definire* (ticket futuri) | `../evidence/test-reports/` |

## Evidenza per release

Le release firmate con provenance (`release.yml`) sono la prova che *questa* versione ha superato la verifica. Collegare ogni release al suo set di test: `../evidence/releases/`.