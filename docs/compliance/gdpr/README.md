# GDPR & Privacy Spine

Struttura documentale GDPR. **Spine day-0** (ADR-0004): i file esistono e definiscono cosa conterranno; il contenuto effettivo (DPIA completa, registro, procedure) viene prodotto da T11 e dalla revisione privacy pre-pilot (PRD §18).

| File | Contiene | Stato |
|---|---|---|
| `dpia.md` | Data Protection Impact Assessment | da completare (T11) |
| `records-of-processing.md` | Registro dei trattamenti (Art. 30) | da completare (T11) |
| `data-minimization.md` | Inventario dati + minimizzazione | da completare (T11) |
| `retention-deletion.md` | Ritenzione + cancellazione (Art. 17) | da completare (T11) |

Principi guida (da `PRD.md` §12 e `CONTEXT.md`):

- Solo i dati necessari al funzionamento (**data minimization** per design).
- **Hard delete** dei dati sanitari entro 30 giorni dalla cancellazione account; audit log senza dati sanitari conservati.
- Export Art. 15/20 realmente disponibile (ticket T10).
- Tutti i dati in giurisdizione EU/adeguata (ADR-0001).