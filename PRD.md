# BPCO Companion — Full PRD (MVP)

> Succede `BPCO_Companion_PRD_MVP.md`, che resta come documento sorgente di riferimento.
> Decisioni di architettura registrate come ADR in `docs/adr/`. Termini di dominio in `CONTEXT.md`.

---

## 1. Overview

BPCO Companion è un'applicazione mobile per persone con diagnosi di BPCO (Broncopneumopatia Cronica Ostruttiva).

Obiettivo iniziale: raccogliere in modo semplice e continuativo informazioni sullo stato di salute del paziente e trasformarle in uno storico comprensibile e condivisibile con il medico.

La prima versione **non** fornisce diagnosi, non modifica terapie, non interpreta clinicamente i dati. Non è un dispositivo medico (vedi §15).

Ipotesi da validare:
1. I pazienti registrano con continuità informazioni relative alla propria BPCO.
2. Lo storico e il report generato dall'app sono utili durante il rapporto paziente-medico.

**North Star** (candidata): *percentuale di pazienti attivi che genera e utilizza un report dopo almeno 30 giorni di raccolta dati.*

---

## 2. Problema e value proposition

Tra una visita pneumologica e l'altra passano settimane o mesi. Il paziente sperimenta variazioni di dispnea, tosse, espettorato, saturazione, attività, terapia e percezione generale, che alla visita vengono ricostruite a memoria e in modo poco strutturato. Il medico ha una fotografia del momento, non dei mesi.

- **Per il paziente**: tenere facilmente traccia dell'andamento e arrivare alla visita con informazioni complete.
- **Per il medico**: ricevere un riepilogo sintetico e strutturato del periodo pre-visita.

---

## 3. Target

- **Utente primario**: adulto con diagnosi di BPCO, autonomo o supportato da caregiver.
- **Utente secondario**: pneumologo o professionista sanitario (fruitore del report, non dell'app).
- **Non inclusi nell'MVP**: caregiver con account dedicato, strutture, centri riabilitativi, associazioni, pharma, telemedicina.

---

## 4. Principi di prodotto

- **Semplice**: check-in quotidiano in meno di un minuto.
- **Comprensibile**: utilizzabile da persone con bassa familiarità digitale.
- **Non ansiogena**: i dati sono mostrati senza trasformare ogni variazione in un allarme.
- **Clinicamente sensata**: parametri definiti con uno pneumologo (Phase 0).
- **Privacy-first**: solo i dati necessari al funzionamento; data minimization per design.

---

## 5. Decisioni chiave (indice)

| Decisione | Scelta | Riferimento |
|---|---|---|
| Scope | Full MVP (§6), cut order in §16 | ADR — |
| Piattaforma | React Native (Expo), iOS + Android | ADR — |
| Backend | EU-sovereign su **Exoscale** (VM + docker compose, Postgres e object storage gestiti) | `docs/adr/0001`, `docs/adr/0002` |
| IaC | **OpenTofu**, hosting-agnostic a due strati, state su storage EU | `docs/adr/0002` |
| Servizi | **Verne Gate** (auth, Ory Kratos) + **Sentry EU** (crash) + push dispatcher self-hosted + events API self-hosted | `docs/adr/0003` |
| Compliance | Spine day-0 (logging, release firmate, GDPR, CI evidence, documentazione); QMS formale a Phase 4 | `docs/adr/0004` |
| i18n | Spina i18n day-0, chiavi `feature.screen.element.variant`; **italiano + inglese** nel pilot | — |
| Report | PDF **on-device**, 90 giorni default, 2-3 pagine, share sheet | — |
| Scala clinica | Scala giornaliera "respiro" 5 punti **distinta** da mMRC (questionario validato) | `CONTEXT.md` |
| Questionari | **CAT mensile + mMRC settimanale** (ipotesi Phase 0) | — |
| Account | email+password, Sign in with Apple, Google | — |
| Ritenzione dati | Hard delete dati sanitari entro 30 giorni da cancellazione account; audit log conservati | — |
| E2E testing | **Maestro** su iOS simulator/Android emulator, flussi per ogni feature; integrazione backend su HTTP reale | §20 |

---

## 6. Scope funzionale MVP

### 6.1 Onboarding
- Creazione account (email+password / Apple / Google).
- Accettazione privacy policy e consensi (spiegazione sintetica prima del testo legale).
- Profilo iniziale minimale: anno di nascita, sesso (solo se clinicamente necessario), conferma diagnosi BPCO, eventuale ossigenoterapia, fumatore/ex/non.
- Configurazione terapia.
- Impostazione reminder (consensi separati: check-in vs terapia).
- Onboarding breve e progressivo; niente carousel introduttivo.

### 6.2 Daily Check-in (30-60 secondi)
Singola schermata scrollabile o 2-3 step, non un wizard.

**Sintomi** (scale semplici e visuali):
- Respiro: scala 5 punti (`muchworse`…`muchbetter`, vedi CONTEXT).
- Tosse: Nessuna/Leggera/Moderata/Forte/Molto forte.
- Espettorato: No/Sì (+ colore opzionale).
- Stato generale: Meglio/Come al solito/Peggio.

**Parametri** (tutti opzionali, adattati al profilo):
- SpO₂ (%), frequenza cardiaca (bpm), temperatura (°C).

**Terapia**: indicare se la terapia prevista è stata assunta (per slot orario). Aggiornabile in seguito. L'app non valuta la correttezza della terapia.

### 6.3 Questionari periodici
- **CAT**: mensile (ipotesi Phase 0), ~2 minuti, risultato punteggio, possibilità "Ricordamelo dopo".
- **mMRC**: settimanale (ipotesi Phase 0), scala validata 0-4.
- Frequenze da confermare con lo pneumologo. Il significato clinico va gestito con attenzione (linguaggio non ansiogeno).

### 6.4 Timeline / Storico
Visualizzazioni: andamento sintomi, SpO₂, frequenza cardiaca, aderenza dichiarata, CAT/mMRC. Selettore 7/30/90 giorni. 3-5 informazioni leggibili al massimo. Insight descrittivi consentiti ("negli ultimi 7 giorni la media è stata inferiore"), mai interpretazione clinica ("la tua BPCO sta peggiorando").

### 6.5 Report medico
- Generazione su periodo: 30 giorni, 90 giorni, personalizzato (default 90).
- Contenuto: sintesi registrazioni, andamento sintomi, parametri, questionari, aderenza, note/eventi, domande per il medico.
- **PDF generato on-device** (i dati sanitari non lasciano il telefono per la generazione), 2-3 pagine, condivisione tramite share sheet di sistema.
- Il paziente decide dove inviare il documento (niente invio diretto al medico).

### 6.6 Preparazione alla visita
Flusso "Prepara la tua visita": come sono cambiati i sintomi, episodi rilevanti (visite non programmate, PS, ricoveri, modifiche terapia), problemi con terapia/inalatori, domande per il medico. Alla fine genera il report visita.

### 6.7 Reminder
Opzionali e disattivabili: check-in giornaliero, terapia, questionari, preparazione visita. Consensi separati. Tramite push dispatcher self-hosted (ADR 0003).

### 6.8 Profilo
Dati personali, terapia, reminder, privacy, esporta dati, cancella account (realmente disponibile), assistenza.

---

## 7. Cosa NON fa l'MVP

Non diagnostica riacutizzazioni, non suggerisce modifiche terapeutiche, non prescrive, non interpreta clinicamente i valori, non calcola rischio, non notifica emergenze via algoritmo, non sostituisce il medico, non offre teleconsulto, non usa AI generativa sui dati sanitari, non integra Bluetooth/smart inhaler, non fa monitoraggio remoto. (Vedi MDR boundary, §15.)

---

## 8. Gestione dei cambiamenti nei dati

L'app descrive variazioni **oggettive** senza attribuire significato clinico automatico.

- Accettabile: "Negli ultimi 7 giorni hai registrato valori di saturazione inferiori rispetto alla tua media precedente."
- Accompagnamento: "Se hai dubbi sul tuo stato di salute, parlane con il tuo medico."
- Vietato: "I tuoi valori indicano un peggioramento della BPCO." / "Potresti avere una riacutizzazione."

---

## 9. Architettura e stack

```
App (Expo / React Native, iOS+Android)
  ├── i18n spine (it/en)
  ├── check-in, timeline, report (PDF on-device)
  └── SDK: Verne Gate auth, Sentry EU
        │
Backend (EU, Exoscale)
  ├── Postgres gestito (dati sanitari, RLS)
  ├── Object storage gestito (EU)
  ├── VM con docker compose (API + push dispatcher, container firmati)
  ├── Events API (analytics self-hosted)
  └── Push dispatcher (APNs/FCM self-hosted)
        │
Infrastructure as Code: OpenTofu (ADR 0002)
```

- **State OpenTofu**: storage S3-compatible EU.
- **Deploy**: container OCI firmati su VM Exoscale via docker compose (niente K8s nell'MVP — vedi ADR-0002).
- **Dispacciamento push**: il dispositivo termina comunque su APNs/FCM (Apple/Google); l'orchestrazione resta in-EU.
- **Analytics**: events API su Postgres EU (eventi §13), nessun tool di analytics US.

---

## 10. i18n

- Spina i18n attiva dal day 0: tutte le stringhe translatable, mai hardcoded.
- Convenzione chiavi: `feature.screen.element.variant` — es. `onboarding.account.title`, `checkin.symptom.breath.scale.muchworse`, `report.pdf.cta.share`.
- Locale del pilot: **it + en**. `it` è il locale primario.
- Le chiavi mancanti devono grep-are direttamente al componente/screen.

---

## 11. Modello dati (bozza)

- `Account` (auth via Verne Gate, OIDC)
- `Profile` (anno nascita, sesso, diagnosi, ossigenoterapia, fumatore) — referenziato per ID
- `Therapy` (farmaco, dosaggio testuale, slot: mattina/pomeriggio/sera)
- `Checkin` (data, sintomi, parametri opzionali, aderenza per slot)
- `QuestionnaireResult` (tipo: CAT/mMRC, punteggio, data)
- `Event` (episodi: visite non programmate, PS, ricoveri, modifiche terapia)
- `Report` (periodo, generato il, contenuto)
- `ReminderPreference` (tipo, orario, abilitato)
- `AuditLog` (immutabile, senza dati sanitari — ADR 0004)

Riferimenti di dominio: `CONTEXT.md`.

---

## 12. Compliance spine (day 0, non differita)

Obbiettivo: costruire dal primo giorno tutto ciò che serve a raggiungere le certificazioni. Vedi ADR `0004`.

- **Logging**: audit log immutabile e tamper-evident di tutti gli accessi ai dati (nessun dato sanitario nel log), 10 anni di ritenzione.
- **Release**: build firmate e versionate; provenance.
- **GDPR**: DPIA, informativa, consensi, data minimization, cifratura, export (Art. 15/20), cancellazione (Art. 17, hard delete entro 30 giorni), gestione breach, sub-responsabili, ritenzione.
- **CI compliance evidence**: SBOM, report di test (unit/integration), record di deployment immutabili, audit trail di pipeline.
- **Documentazione**: struttura documentale mappata al futuro Technical File MDR (ISO 13485 / IEC 62304 / ISO 14971).
- **Ritenzione/delezione**: hard delete dei dati sanitari entro 30 giorni dalla cancellazione account; gli audit log (senza dati sanitari) vengono conservati.

---

## 13. Metriche e analytics

### Funnel principale
Registrazione → Onboarding completato → Primo check-in → 3 check-in → D7 active → D30 active → Report generato → Report usato in visita (ultimo step richiede feedback esplicito: "Hai mostrato questo report al tuo medico?").

### Eventi analytics (self-hosted, eventi prodotto, senza dati sanitari)
```
account_created
onboarding_started / onboarding_completed / onboarding_abandoned
checkin_started / checkin_completed / checkin_abandoned
spo2_added / therapy_marked
questionnaire_started / questionnaire_completed
history_viewed
report_started / report_completed / report_exported / report_shared
reminder_received / reminder_opened
```

### Metriche per schermata
- Onboarding: completion rate.
- Check-in: completion rate + tempo medio.
- Home: % utenti che avvia check-in.
- Reminder: conversione reminder → check-in.
- Storico: % che consulta i trend.
- Questionari: completion rate.
- Report: generation rate; share/export rate.
- Prodotto: D7/D30/D60/D90 retention per coorti.

### Engagement / Churn / Clinical usefulness
- Engagement: giorni attivi/mese, check-in medi, completion rate, questionari completati, reminder aperti.
- Churn: segmentato dopo-onboarding, <7g, 7-30g, 30-90g + exit survey (opzioni §"Mi dimentico", "Richiede troppo tempo", ecc.).
- Utilità clinica (proxy): report generati, mostrati al medico, % medici/pazienti che li considerano utili.

---

## 14. Pilot

- **20-30 pazienti**, 8-12 settimane.
- Coinvolgere: almeno uno pneumologo, pazienti con diversi livelli di familiarità digitale, alcuni caregiver.
- Raccolta: analytics quantitativi + interviste qualitative.
- Successo se emerge evidenza che: quota significativa continua oltre il mese, il check-in non è oneroso, i pazienti comprendono i trend, il report viene portato in visita, gli pneumologi lo ritengono utile, emerge ≥1 canale di acquisizione.
- Decisione finale: **build further, pivot, stop**.

---

## 15. Medical Device boundary

L'MVP è progettato per **non** essere un dispositivo medico (nessuna funzione di diagnosi o decision support clinico). La scelta di host EU-sovereign, lo spine compliance day-0 e la documentazione (ADR 0004) preservano il percorso verso MDR.

Qualsiasi futura funzionalità che interpreti dati clinici, identifichi anomalie, predica riacutizzazioni, suggerisca azioni cliniche o supporti decisioni terapeutiche va valutata separatamente (MDR / Medical Device Software, QMS ISO 13485, risk file ISO 14971, ciclo di vita IEC 62304, cybersecurity IEC 81001-5-1).

---

## 16. Cut order ("MVP effettivo")

Se necessario ridurre ulteriormente la prima release (dal doc sorgente §46):
1. Account 2. Onboarding 3. Daily check-in 4. Terapia 5. CAT 6. Storico 30/90 giorni 7. Report PDF 8. Reminder 9. Profilo/privacy.

---

## 17. Roadmap

- **Phase 0 — Discovery**: definizione parametri clinici (con pneumologo), interviste pazienti/pneumologi, definizione report, verifica privacy/regolatoria.
- **Phase 1 — MVP**: onboarding, diario, terapia, parametri, questionari, timeline, reminder, report PDF, spine compliance.
- **Phase 2 — Validation**: pilot 20-30 pazienti, misurazione retention/churn/engagement/utilità report.
- **Phase 3 — PMF exploration**: miglioramento UX, caregiver, portale medico, HealthKit/Health Connect, dispositivi, modelli B2B2C.
- **Phase 4 — Clinical platform** (solo dopo validazione): telemonitoraggio, alert, predictive analytics, smart inhaler, AI, percorso Medical Device + QMS formale.

---

## 18. Questioni aperte (Phase 0)

- Conferma pneumologo di: scale sintomi (5 punti), espettorato (No/Sì + colore), parametri richiesti, frequenza CAT/mMRC, struttura report.
- Validazione clinica del flusso "Prepara visita" (domande su peggioramenti/eventi/problemi terapia).
- Verifica privacy/legale completa prima del pilot pubblico.

---

## 19. Note sul tono

Evitare gamification aggressiva. Il messaggio dopo il check-in è neutro ("Registrato ✓"). Il linguaggio dei trend è descrittivo, mai allarmistico né diagnostico (§8).
---

## 20. E2E testing (Maestro)

Ogni feature e ogni layer di integrazione viene coperto da test end-to-end, oltre agli unit test già presenti.

### App (UI E2E) — Maestro

- **Strumento**: Maestro, flussi YAML in `.maestro/flows/`, eseguiti su iOS simulator (Xcode 26+) e Android emulator.
- **Copertura**: un flusso per ogni feature: onboarding (privacy → profilo → terapia → promemoria), gate di autenticazione, 4 tab, e a seguire check-in, timeline, report, reminder.
- **Build**: app nativa via `expo run:ios` / `expo run:android` (prebuild + dev build), non Expo Go.
- **Eseguibili localmente**: `maestro test .maestro/flows/<feature>.yaml`.
- **Regola**: nessuna feature si considera chiusa senza il suo flusso Maestro (acceptance criterion di ogni ticket feature).

### Integrazione backend

- Test di integrazione HTTP reale (server Fastify avviato, chiamate reali) oltre agli unit test con fetch mockato.
- Dove serve un mock di Verne Gate: un OIDC server fittizio locale (stesso contratto `/auth/login` → `/auth/callback` → session).

### CI

- Workflow E2E dedicato: build nativa → avvio simulator → `maestro test` su ogni push alla branch PR.
- Report Maestro (JUnit) come artefatto CI, aggregato con unit/integration in `docs/compliance/evidence/`.

### Compliance

- Gli E2E producono evidenza di verifica di sistema per il Technical File (IEC 62304 system testing, `05-verification.md`).
