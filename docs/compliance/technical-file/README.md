# Technical File

Struttura documentale mappata al futuro Technical File MDR (EU 2017/745, Annex II), secondo ADR-0004. Questo è la **mappa, non la macchina**: nessun processo QMS formale parte ora; i file seguenti definiscono dove ogni evidenza andrà a vivere quando verrà prodotta.

Gli standard che sostanziano il file: **ISO 13485** (QMS), IEC 62304 (software lifecycle), ISO 14971 (risk management), IEC 81001-5-1 / MDCG 2019-16 (cybersecurity). L'ISO 13485 è il QMS che governa l'intero file; la sua certificazione formale parte a Phase 4 (ADR-0004), ma questa struttura vi è già allineata.

Ogni sezione corrisponde a una parte del Technical File / agli standard armonizzati che lo sostanziano (ISO 13485, IEC 62304, ISO 14971, IEC 81001-5-1, MDCG 2019-16).

| Sezione | File | Copre | Stato |
|---|---|---|---|
| 01 Device overview | `01-device-overview.md` | intended purpose, descrizione, utenti, claims | placeholder |
| 02 GSPR | `02-gspr.md` | checklist General Safety & Performance Requirements | placeholder |
| 03 Design | `03-design.md` | design inputs/outputs, architettura (IEC 62304) | placeholder |
| 04 Risk management | `04-risk-management.md` | risk file ISO 14971 | placeholder |
| 05 Verification | `05-verification.md` | test evidence (unit/integration/system), SOUP | placeholder |
| 06 Cybersecurity | `06-cybersecurity.md` | IEC 81001-5-1, MDCG 2019-16 | placeholder |
| 07 Post-market | `07-post-market-surveillance.md` | PMS plan (Art. 83) | placeholder |

Le evidenze prodotte dalla pipeline (SBOM, test report, audit log, release firmate) sono indicizzate in `../evidence/`; i file qui vi puntano, non le duplicano.

Quando un processo QMS formale parte (Phase 4, vedi ADR-0004), queste sezioni vengono riempite a partire dalle evidenze già raccolte — l'additività è il punto.