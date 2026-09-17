# Compliance

Indice della struttura documentale di compliance, mappata al futuro **Technical File MDR** e alla **spine GDPR day-0**, secondo `docs/adr/0004-compliance-spine-day0.md` e `PRD.md` §12.

## Struttura

```
docs/compliance/
├── README.md                ← questo indice
├── technical-file/          ← mappa del futuro Technical File MDR (ISO 13485, IEC 62304, ISO 14971, IEC 81001-5-1)
│   ├── README.md
│   ├── 01-device-overview.md
│   ├── 02-gspr.md
│   ├── 03-design.md
│   ├── 04-risk-management.md
│   ├── 05-verification.md
│   ├── 06-cybersecurity.md
│   └── 07-post-market-surveillance.md
├── evidence/                ← indice degli artefatti CI (SBOM, test report, release firmate, audit log)
│   └── README.md
└── gdpr/                    ← spine GDPR (DPIA, registro, minimizzazione, ritenzione)
    ├── README.md
    ├── dpia.md
    ├── records-of-processing.md
    ├── data-minimization.md
    └── retention-deletion.md
```

## Mappa rapida

| Ti serve | Vai a |
|---|---|
| Dove vivono SBOM/test/release/audit | `evidence/README.md` |
| Test report per il Technical File | `technical-file/05-verification.md` |
| Sicurezza/cybersecurity della pipeline | `technical-file/06-cybersecurity.md` |
| SOUP (provider come SOUP) | `technical-file/03-design.md` |
| Rischi già mitigati per design | `technical-file/04-risk-management.md` |
| Ritenzione e cancellazione dati | `gdpr/retention-deletion.md` |
| Cosa si raccoglie (e cosa no) | `gdpr/data-minimization.md` |
| Audit log immutabile | questo file sotto ↓ |

## Riferimenti obbligatori

- **ADR-0004** (`docs/adr/0004-compliance-spine-day0.md`) — spine day-0, QMS formale a Phase 4.
- **PRD §12** (`PRD.md`) — compliance spine: logging, release firmate, GDPR, CI evidence, documentazione.
- **PRD §15** — medical device boundary (l'MVP non è dispositivo).
- **PRD §18** — questioni aperte Phase 0, inclusa la verifica privacy/legale pre-pilot.

## Audit log

Le deployment aggiungono entry hash-chained e tamper-evident a `deployment-audit.log` sul branch dedicato `audit-log` (mai su `main`), guidate dal workflow riusabile `deploy.yml`. Ogni entry referenzia l'hash del commit precedente: alterare una entry storica rompe la catena. La history git di `audit-log` è lo store append-only; il branch va protetto contro la riscrittura. Ogni entry registra attore, commit SHA, run, ambiente, release e il gate ADR-0004 verificato.

Nessun dato sanitario entra mai in questi log (`CONTEXT.md`, "Dato sanitario"). Le modifiche infrastrutturali (`tofu apply`) sono guidate dal workflow di deploy T02, che invoca questo rail come gate di compliance.