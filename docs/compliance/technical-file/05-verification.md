# 05 — Verification & Validation

> Placeholder. Evidenza di test per il Technical File (IEC 62304 unit/integration/system). Le evidenze vengono prodotte dalla pipeline (T01) e vivono in `../evidence/`.

## Livelli di verifica

| Livello | Prodotto da | Dove vive |
|---|---|---|
| Unit test | `ci.yml` → `npm run test` / `test:ci` | `../evidence/test-reports/` |
| Typecheck | `ci.yml` → `npm run typecheck` | report CI |
| Lint | `ci.yml` → `npm run lint` | report CI |
| Integration (HTTP reale) | backend test integration | `../evidence/test-reports/` |
| System / E2E (UI) | **Maestro** su simulator/emulator (PRD §20) | `../evidence/test-reports/` (JUnit) |

Evidenza di verifica di sistema (IEC 62304 system testing) prodotta dai flussi Maestro per ogni feature: onboarding, auth gate, tabs, check-in, timeline, report, reminder.

## Evidenza per release

Le release firmate con provenance (`release.yml`) sono la prova che *questa* versione ha superato la verifica. Collegare ogni release al suo set di test: `../evidence/releases/`.