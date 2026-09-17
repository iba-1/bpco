# Retention & Deletion (Art. 17)

> Placeholder. Politica di ritenzione e cancellazione. La decisione è registrata in ADR-0004 e ticket T10; il dettaglio operativo viene completato con T11.

## Decisione (da grill-with-docs, PRD §12)

- **Hard delete** di tutti i dati sanitari entro **30 giorni** dalla cancellazione account.
- Gli **audit log** (senza dati sanitari) vengono **conservati** (10 anni).
- Export dati (Art. 15/20) realmente disponibile prima della cancellazione (T10).

## Matrice di ritenzione

| Dato | Ritenzione | Fine |
|---|---|---|
| Dati sanitari (check-in, questionari, report, profilo) | Finché l'account è attivo | Hard delete ≤30gg da cancellazione |
| Eventi analytics (senza dati sanitari) | Da definire | Da definire |
| Audit log | 10 anni | Permanente su branch dedicato |

## Deletion semantics

La cancellazione account (T10) è **reale e verificabile**: non uno stub. Il flusso è confirmation-guarded. I dati sanitari vengono eliminati dai sistemi primari e di backup entro la finestra di 30 giorni; gli audit log restano perché non contengono dati sanitari (PRD §12).