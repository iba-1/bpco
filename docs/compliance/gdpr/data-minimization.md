# Data Minimization

> Placeholder. Inventario dati e principi di minimizzazione (GDPR Art. 5(1)(c)). Da completare con T11 e la revisione privacy.

## Principio

Vengono raccolti **esclusivamente i dati necessari al funzionamento del prodotto** (PRD §4, §6.1). Ogni campo aggiunto peggiora onboarding e retention — la minimizzazione è anche una decisione di prodotto.

## Inventario dati raccolti (MVP)

| Dato | Dove | Necessario? |
|---|---|---|
| Anno di nascita | Profilo iniziale | Per stratificazione — da validare con pneumologo (PRD §6.1) |
| Sesso | Profilo iniziale | Solo se clinicamente necessario (PRD §6.1) |
| Diagnosi BPCO | Profilo iniziale | Sì (inclusione) |
| Ossigenoterapia | Profilo iniziale | Sì (contesto) |
| Fumatore/ex/non | Profilo iniziale | Da validare |
| Terapia (farmaco, dose, slot) | Configurazione terapia | Sì (aderenza) |
| Sintomi/parametri/aderenza | Check-in | Sì (core) |
| Punteggi CAT/mMRC | Questionari | Sì (core) |
| Eventi pre-visita | Prepara visita | Sì (report) |
| Eventi analytics | Analytics | No dati sanitari (PRD §13) |

## Non raccolti nell'MVP

Nessun dato amministrativo, storia clinica completa, comorbidità dettagliate, ricoveri pregressi: l'onboarding raccoglie solo i campi di PRD §6.1. Nessuna integrazione sanitaria/SPID/CIE: l'account è email+password / Apple / Google (PRD §6.1, §5).