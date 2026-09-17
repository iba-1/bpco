# BPCO Companion — PRD + Screen Map & User Flow MVP

## 1. Overview

BPCO Companion è un’applicazione mobile pensata per persone affette da BPCO.

L’obiettivo iniziale è aiutare il paziente a raccogliere in modo semplice e continuativo informazioni sul proprio stato di salute e trasformarle in uno storico comprensibile e condivisibile con il proprio medico.

La prima versione non fornisce diagnosi, non modifica terapie e non interpreta clinicamente i dati del paziente.

Il prodotto deve validare principalmente due ipotesi:

1. I pazienti sono disposti a registrare con continuità informazioni relative alla propria BPCO.
2. Lo storico e il report generato dall’app risultano utili durante il rapporto paziente-medico.

---

## 2. Problema

Tra una visita pneumologica e quella successiva possono trascorrere settimane o mesi.

Durante questo periodo il paziente può sperimentare variazioni di:

- difficoltà respiratoria;
- tosse;
- espettorato;
- saturazione;
- attività fisica;
- utilizzo della terapia;
- percezione generale del proprio stato di salute.

Al momento della visita queste informazioni vengono spesso ricostruite a memoria e in maniera poco strutturata.

Il medico può quindi avere una fotografia del momento, ma una visione incompleta di ciò che è accaduto nei mesi precedenti.

---

## 3. Value proposition

### Per il paziente

Tenere facilmente traccia dell’andamento della propria BPCO e arrivare alla visita con informazioni più complete.

### Per il medico

Ricevere un riepilogo sintetico e strutturato del periodo precedente alla visita.

---

## 4. Target iniziale

### Primary user

Persona adulta con diagnosi di BPCO, autonoma o supportata da un caregiver.

### Secondary user

Pneumologo o altro professionista sanitario che segue il paziente.

### Utenti futuri

Non inclusi nell’MVP:

- caregiver con account dedicato;
- strutture sanitarie;
- centri di riabilitazione;
- associazioni di pazienti;
- aziende farmaceutiche;
- servizi di telemedicina.

---

## 5. Principi di prodotto

L’app deve essere:

**Semplice.**  
Il check-in quotidiano dovrebbe richiedere idealmente meno di un minuto.

**Comprensibile.**  
Interfaccia utilizzabile anche da persone con bassa familiarità con strumenti digitali.

**Non ansiogena.**  
I dati vengono mostrati senza trasformare ogni variazione in un allarme.

**Clinicamente sensata.**  
I parametri raccolti devono essere definiti insieme a uno pneumologo.

**Privacy-first.**  
Vengono raccolti esclusivamente i dati necessari al funzionamento del prodotto.

---

## 6. MVP

### 6.1 Onboarding

L’utente può:

- creare un account;
- accettare privacy policy e condizioni;
- inserire alcune informazioni iniziali;
- configurare la propria terapia;
- impostare eventuali reminder.

L’onboarding deve essere breve e progressivo.

Non devono essere richieste informazioni non necessarie all’utilizzo iniziale.

### 6.2 Daily Check-in

L’utente può registrare giornalmente alcuni parametri.

#### Sintomi

- difficoltà respiratoria;
- tosse;
- espettorato;
- percezione generale dello stato respiratorio.

Preferibilmente tramite scale semplici e visuali.

#### Parametri

Inserimento opzionale di:

- SpO₂;
- frequenza cardiaca;
- temperatura.

#### Terapia

Possibilità di indicare se la terapia prevista è stata assunta.

Esempio:

- Terapia mattina: ✓
- Terapia sera: ✓

Il prodotto non valuta la correttezza della terapia.

### 6.3 Questionari

L’app può somministrare periodicamente questionari validati indicati dal referente clinico.

Prima ipotesi:

- CAT;
- mMRC.

La frequenza verrà definita insieme al medico.

### 6.4 Timeline

L’utente può consultare lo storico delle registrazioni.

Visualizzazioni principali:

- andamento sintomi;
- SpO₂;
- frequenza cardiaca;
- aderenza dichiarata alla terapia;
- andamento CAT/mMRC.

La timeline deve privilegiare leggibilità rispetto alla quantità di informazioni mostrate.

### 6.5 Report medico

L’utente può generare un report relativo a un periodo selezionato.

Prima versione:

- ultimi 30 giorni;
- ultimi 90 giorni.

Il report contiene:

- sintesi delle registrazioni;
- andamento sintomi;
- andamento dei parametri disponibili;
- risultati dei questionari;
- aderenza dichiarata alla terapia;
- eventuali note inserite dal paziente.

Output:

**PDF condivisibile o stampabile.**

Il report deve essere progettato insieme a uno pneumologo per evitare informazioni inutili o ridondanti.

### 6.6 Preparazione alla visita

Prima di una visita il paziente può avviare un breve percorso:

**“Prepara la tua visita”**

Il flusso può chiedere:

- come sono cambiati i sintomi;
- eventuali episodi rilevanti;
- variazioni percepite;
- problemi con terapia o inalatori;
- domande da fare al medico.

Alla fine viene generato il report visita.

### 6.7 Reminder

Reminder opzionali per:

- check-in giornaliero;
- terapia;
- compilazione questionari;
- preparazione alla visita.

I reminder devono poter essere disattivati e configurati facilmente.

---

## 7. Cosa NON fa l’MVP

L’MVP non deve:

- diagnosticare riacutizzazioni;
- suggerire modifiche terapeutiche;
- prescrivere farmaci;
- interpretare clinicamente valori;
- calcolare rischio clinico;
- notificare emergenze sulla base di algoritmi;
- sostituire il medico;
- offrire teleconsulto;
- offrire marketplace di professionisti;
- utilizzare AI generativa sui dati sanitari;
- integrare dispositivi Bluetooth;
- integrare smart inhaler;
- effettuare monitoraggio medico remoto.

Queste funzionalità potranno essere analizzate successivamente.

---

## 8. Gestione dei cambiamenti nei dati

L’app può descrivere variazioni oggettive senza attribuire automaticamente significato clinico.

Esempio accettabile:

> Negli ultimi 7 giorni hai registrato valori di saturazione inferiori rispetto alla tua media precedente.

Possibile accompagnamento:

> Se hai dubbi sul tuo stato di salute o hai notato un peggioramento, parlane con il tuo medico.

Da evitare nell’MVP:

> I tuoi valori indicano un peggioramento della BPCO.

oppure:

> Potresti avere una riacutizzazione.

---

## 9. Metriche MVP

La finalità del primo pilot non è massimizzare il numero di download.

L’obiettivo è misurare utilizzo continuativo e valore percepito.

### Activation

Percentuale di utenti che:

- completano onboarding;
- effettuano il primo check-in;
- effettuano almeno 3 check-in nella prima settimana.

### Retention

Misurare:

- D7 retention;
- D30 retention;
- D60 retention;
- D90 retention.

Analizzare retention per coorti.

### Engagement

Misurare:

- giorni attivi al mese;
- numero medio di check-in;
- completion rate dei check-in;
- questionari completati;
- reminder aperti.

### Churn

Analizzare quando gli utenti smettono di utilizzare il prodotto.

Segmentare almeno:

- churn dopo onboarding;
- churn prima di 7 giorni;
- churn 7-30 giorni;
- churn 30-90 giorni.

L’obiettivo iniziale non è definire un churn target arbitrario, ma comprendere il comportamento naturale degli utenti.

### Clinical usefulness proxy

Misurare:

- report generati;
- report effettivamente mostrati al medico;
- percentuale di medici che considera il report utile;
- percentuale di pazienti che considera il report utile durante la visita.

---

## 10. Pilot

Prima validazione:

**20-30 pazienti**

Durata:

**8-12 settimane**

Coinvolgere possibilmente:

- almeno uno pneumologo;
- pazienti con differenti livelli di familiarità digitale;
- alcuni caregiver.

Durante il pilot raccogliere sia analytics quantitativi sia interviste qualitative.

---

## 11. Domande da validare

### User behavior

- Il paziente compila realmente il diario?
- Con quale frequenza?
- Per quanto tempo?
- Quali dati considera troppo faticosi da inserire?

### Value

- Il paziente percepisce un vantaggio concreto?
- Il report migliora la preparazione alla visita?
- Il medico considera le informazioni utili?

### UX

- Il check-in è abbastanza semplice?
- Le persone anziane riescono a utilizzare il prodotto senza assistenza continua?
- I grafici vengono compresi?

### Business

Chi sarebbe disposto a pagare?

- paziente;
- struttura sanitaria;
- associazione;
- pharma;
- assicurazione;
- programma di telemedicina.

La monetizzazione non è una condizione necessaria per il primo pilot.

---

## 12. Business model — ipotesi

### Freemium B2C

Possibile futura struttura.

#### Free

- diario;
- sintomi;
- parametri;
- terapia;
- grafici essenziali.

#### Premium

Possibili funzionalità:

- report avanzati;
- storico esteso;
- caregiver;
- export;
- integrazione dispositivi.

Da validare la reale willingness-to-pay.

### B2B2C

Ipotesi considerata potenzialmente più interessante.

Un soggetto terzo finanzia l’utilizzo dell’app per i pazienti.

Possibili interlocutori:

- aziende farmaceutiche;
- strutture sanitarie;
- associazioni;
- centri di riabilitazione;
- assicurazioni;
- servizi di telemedicina.

---

## 13. Privacy e compliance

Il prodotto tratta dati relativi alla salute.

La progettazione dovrà quindi considerare sin dall’inizio:

- GDPR;
- base giuridica del trattamento;
- consenso ove necessario;
- informativa privacy;
- data minimization;
- cifratura;
- gestione degli accessi;
- audit/logging;
- conservazione dei dati;
- cancellazione ed esportazione;
- fornitori e sub-responsabili;
- eventuali trasferimenti extra UE;
- DPIA;
- gestione data breach.

Prima del pilot pubblico dovrà essere effettuata una revisione privacy e legale.

---

## 14. Medical Device boundary

L’MVP deve essere progettato per evitare intenzionalmente funzionalità di diagnosi o decision support clinico.

Qualsiasi futura funzionalità che:

- interpreti dati clinici;
- identifichi anomalie;
- predica riacutizzazioni;
- suggerisca azioni cliniche;
- supporti decisioni terapeutiche;

dovrà essere valutata separatamente dal punto di vista MDR / Medical Device Software.

---

## 15. Roadmap indicativa

### Phase 0 — Discovery

- definizione parametri clinici;
- interviste pazienti;
- interviste pneumologi;
- definizione report;
- verifica privacy/regolatoria.

### Phase 1 — MVP

- onboarding;
- diario;
- terapia;
- parametri;
- questionari;
- timeline;
- reminder;
- report PDF.

### Phase 2 — Validation

Pilot con 20-30 pazienti.

Misurazione retention, churn, engagement e utilità del report.

### Phase 3 — Product-market fit exploration

Sulla base dei risultati:

- miglioramento UX;
- caregiver;
- portale medico;
- integrazione HealthKit / Health Connect;
- integrazione dispositivi;
- modelli B2B2C.

### Phase 4 — Clinical platform

Solo dopo validazione:

- telemonitoraggio;
- sistemi di alert;
- predictive analytics;
- smart inhaler;
- AI;
- eventuale percorso Medical Device.

---

## 16. North Star iniziale

La metrica principale non deve essere il numero di download.

La prima North Star candidata è:

**Percentuale di pazienti attivi che genera e utilizza un report dopo almeno 30 giorni di raccolta dati.**

Questa metrica combina:

- retention;
- raccolta dati;
- utilizzo continuativo;
- valore finale per il paziente.

---

## 17. Success criteria del pilot

Il pilot viene considerato promettente se emergono evidenze che:

1. una quota significativa dei pazienti continua a usare il prodotto oltre il primo mese;
2. il check-in non viene percepito come eccessivamente oneroso;
3. i pazienti comprendono i propri trend;
4. il report viene effettivamente portato alla visita;
5. gli pneumologi ritengono il report utile;
6. emerge almeno un canale concreto per acquisire pazienti su scala maggiore.

Il pilot deve servire principalmente a decidere:

**build further, pivot oppure stop.**

---

# 18. Screen Map & User Flow MVP

## 18.1 Navigazione principale

L’MVP può funzionare con 4 tab principali:

- **Home**
- **Storico**
- **Report**
- **Profilo**

Il check-in deve essere accessibile direttamente dalla Home.

---

## 18.2 Screen map

```text
APP
│
├── Onboarding
│   ├── Welcome
│   ├── Account
│   ├── Privacy & consensi
│   ├── Profilo iniziale
│   ├── Terapia
│   └── Reminder
│
├── Home
│   ├── Stato di oggi
│   ├── Daily Check-in
│   │   ├── Respiro
│   │   ├── Tosse
│   │   ├── Espettorato
│   │   ├── Stato generale
│   │   ├── SpO₂
│   │   ├── Frequenza cardiaca
│   │   ├── Temperatura
│   │   └── Terapia
│   │
│   ├── Check-in completato
│   ├── Reminder terapia
│   └── Questionario periodico
│
├── Storico
│   ├── Overview
│   ├── Sintomi
│   ├── Saturazione
│   ├── Frequenza cardiaca
│   ├── Terapia
│   └── CAT / mMRC
│
├── Report
│   ├── Prepara visita
│   ├── Selezione periodo
│   ├── Domande pre-visita
│   ├── Anteprima report
│   └── PDF / Condivisione
│
└── Profilo
    ├── Dati personali
    ├── Terapia
    ├── Reminder
    ├── Privacy
    ├── Esporta dati
    └── Cancella account
```

---

## 19. Primo utilizzo

### Screen 1 — Welcome

Messaggio:

> Tieni traccia della tua BPCO e prepara meglio le tue visite.

CTA:

**Inizia**

Secondaria:

**Ho già un account**

Niente carousel introduttivo da 5 schermate.

---

## 20. Creazione account

Possibili opzioni:

- email + password;
- Sign in with Apple;
- Google.

Da evitare nell’MVP:

- SPID;
- CIE;
- autenticazione sanitaria;
- collegamenti con fascicolo sanitario.

Potranno essere valutati successivamente.

---

## 21. Privacy e trattamento dati

Una schermata dedicata spiega chiaramente:

- quali dati vengono raccolti;
- perché;
- chi può vederli;
- per quanto tempo vengono conservati;
- che l’app non sostituisce il medico.

Non mostrare semplicemente una checkbox seguita da un testo legale incomprensibile.

Ci deve essere una spiegazione sintetica prima del testo legale completo.

---

## 22. Profilo iniziale

Chiedere solo ciò che serve.

Possibile MVP:

- anno di nascita;
- sesso, solo se clinicamente necessario;
- diagnosi BPCO confermata;
- eventuale ossigenoterapia;
- fumatore / ex fumatore / non fumatore.

Da validare con pneumologo.

Non chiederei immediatamente:

- intera storia clinica;
- comorbidità dettagliate;
- ricoveri degli ultimi dieci anni;
- dati amministrativi.

Ogni campo aggiunto peggiora onboarding e retention.

---

## 23. Configurazione terapia

Il paziente può inserire:

```text
Farmaco
Dosaggio / indicazione testuale
Mattina
Pomeriggio
Sera
```

Esempio:

```text
Trelegy Ellipta

1 inalazione
08:00
```

L’app deve limitarsi a ricordare ciò che il paziente ha inserito.

Non deve validare prescrizione o dosaggio.

---

## 24. Reminder

Domanda:

> Vuoi che ti ricordi di registrare come stai?

Default suggerito:

**1 reminder al giorno**

Possibilità di scegliere orario.

Poi:

> Vuoi ricevere anche i reminder della terapia?

Separare i due consensi.

---

## 25. Home

La Home deve essere estremamente semplice.

Esempio:

```text
Buongiorno 👋

Come stai oggi?

[ Fai il check-in ]

─────────────────

Terapia di oggi

✓ Mattina
○ Sera

─────────────────

Ultimi 7 giorni

Respiro
Stabile

SpO₂ media
94%

─────────────────

Prossimo questionario
CAT tra 5 giorni
```

La cosa più importante della schermata deve essere sempre:

**Fai il check-in**

---

## 26. Daily Check-in

Target:

**30-60 secondi.**

Meglio una singola schermata scrollabile o massimo 2-3 step.

Non fare un wizard da 10 schermate.

### 26.1 Sintomi

#### Respiro

> Come senti il respiro oggi?

Possibile scala:

```text
Molto bene
Bene
Come al solito
Peggio
Molto peggio
```

Oppure una scala visiva 1-5.

#### Tosse

```text
Nessuna
Leggera
Moderata
Forte
Molto forte
```

#### Espettorato

Prima domanda:

> Hai avuto espettorato oggi?

**No / Sì**

Se sì, eventuali parametri aggiuntivi solo se clinicamente rilevanti.

#### Stato generale

> Come ti senti oggi rispetto al solito?

```text
Meglio
Come al solito
Peggio
```

### 26.2 Parametri

Se il paziente li misura:

#### Saturazione

```text
SpO₂

[ 94 ] %
```

#### Frequenza cardiaca

```text
[ 76 ] bpm
```

#### Temperatura

```text
[ 36.7 ] °C
```

Tutti opzionali.

L’interfaccia deve adattarsi al profilo.

### 26.3 Terapia

Alla fine:

```text
Hai assunto la terapia prevista?

Mattina    ✓
Sera       ○
```

L’utente può aggiornarla anche successivamente.

---

## 27. Check-in completato

Dopo il salvataggio:

```text
Registrato ✓

Hai completato il check-in di oggi.
```

Poi eventualmente:

```text
Hai registrato i tuoi dati
5 giorni su 7 questa settimana.
```

Evitare gamification aggressiva.

---

## 28. Questionario CAT

Quando necessario:

```text
È il momento del tuo questionario CAT.

Richiede circa 2 minuti.

[ Inizia ]
[ Ricordamelo dopo ]
```

Risultato:

```text
Questionario completato.

Punteggio: 16
```

Possibile visualizzazione:

```text
3 mesi fa    13
2 mesi fa    14
Oggi         16
```

Il significato clinico deve essere gestito con grande attenzione.

---

## 29. Storico

Schermata principale:

```text
Il tuo andamento

[ 7 giorni | 30 giorni | 90 giorni ]

Respiro
─────────────

SpO₂
─────────────

Terapia
87%

CAT
14 → 16
```

Devono essere leggibili 3-5 informazioni.

---

## 30. Dettaglio parametro

Toccando, per esempio, SpO₂:

```text
Saturazione

Ultimi 30 giorni

      ──╮
────────╯───
    ─────────

Media
94%

Valore minimo registrato
91%

Misurazioni
24
```

Possibile insight descrittivo:

> Negli ultimi 7 giorni la media delle tue registrazioni è stata inferiore rispetto ai 7 giorni precedenti.

Non:

> La tua BPCO sta peggiorando.

---

## 31. Report

Prima schermata:

```text
Prepara la prossima visita

Crea un riepilogo della tua situazione
da condividere con il medico.

[ Prepara il report ]
```

Sotto:

```text
Ultimo report
12 settembre 2026
```

---

## 32. Flusso “Prepara visita”

### Step 1 — Periodo

```text
Ultimi 30 giorni
Ultimi 90 giorni
Periodo personalizzato
```

Default:

**90 giorni**

### Step 2 — Domande semplici

#### Peggioramenti

> Hai avuto periodi in cui respiravi sensibilmente peggio del solito?

```text
No
Sì
Non ricordo
```

#### Eventi

> Nell’ultimo periodo hai avuto:

```text
☐ Visite non programmate
☐ Accessi al pronto soccorso
☐ Ricoveri
☐ Modifiche della terapia
☐ Nessuno di questi
```

Da validare clinicamente.

#### Problemi terapia

> Hai avuto difficoltà con la terapia?

```text
☐ Mi dimentico alcune dosi
☐ Ho difficoltà a usare l’inalatore
☐ Effetti indesiderati
☐ Altro
☐ Nessun problema
```

#### Domande per il medico

Campo libero:

> C’è qualcosa di cui vuoi parlare durante la visita?

---

## 33. Anteprima report

```text
Report BPCO
Ultimi 90 giorni

Registrazioni
67 giorni su 90

Stato respiratorio
────────────

Saturazione
────────────

CAT
14 → 16

Terapia dichiarata
87%

Eventi
1 modifica terapia

Domande per il medico
“Negli ultimi giorni...”
```

CTA:

**Genera PDF**

---

## 34. PDF

Idealmente massimo:

**2-3 pagine.**

Struttura:

### Pagina 1

Identificazione paziente e overview.

### Pagina 2

Trend principali.

### Pagina 3

Questionari, eventi e domande del paziente.

Il PDF non deve diventare un dump di migliaia di rilevazioni.

---

## 35. Condivisione

Dopo la generazione:

```text
[ Condividi ]
[ Salva ]
```

Uso della normale share sheet del sistema operativo.

Per l’MVP evitare l’invio diretto a email del medico.

Meglio che sia il paziente a decidere dove inviare il proprio documento.

---

## 36. Profilo

Contiene:

```text
Profilo personale
Terapia
Reminder
Privacy
Esporta i miei dati
Cancella il mio account
Assistenza
```

La cancellazione account deve essere realmente disponibile.

---

## 37. User flow principale

```text
NOTIFICA
   ↓
HOME
   ↓
CHECK-IN
   ↓
30-60 sec
   ↓
SALVA
   ↓
FINE
```

L’app non deve chiedere all’utente di “navigare”.

---

## 38. User flow longitudinale

```text
CHECK-IN GIORNALIERI
        ↓
DATI STORICI
        ↓
TREND
        ↓
QUESTIONARI PERIODICI
        ↓
PREPARAZIONE VISITA
        ↓
REPORT
        ↓
VISITA MEDICA
        ↓
NUOVO CICLO
```

---

## 39. Core Product Loop

```text
REGISTRA
   ↓
COMPRENDI
   ↓
CONDIVIDI
   ↓
PERCEPISCI VALORE
   ↓
CONTINUA A REGISTRARE
```

Se questo ciclo funziona, abbiamo retention.

Se non funziona, aggiungere AI o dispositivi non risolve il problema.

---

## 40. Analytics events

Fin dal pilot traccerei almeno:

```text
account_created

onboarding_started
onboarding_completed
onboarding_abandoned

checkin_started
checkin_completed
checkin_abandoned

spo2_added
therapy_marked

questionnaire_started
questionnaire_completed

history_viewed

report_started
report_completed
report_exported
report_shared

reminder_received
reminder_opened
```

Analytics progettate in modo compatibile con il trattamento dei dati sanitari.

---

## 41. Funnel principale

```text
Registrazione
     ↓
Onboarding completato
     ↓
Primo check-in
     ↓
3 check-in
     ↓
D7 active
     ↓
D30 active
     ↓
Report generato
     ↓
Report utilizzato nella visita
```

L’ultimo passaggio richiederà probabilmente feedback esplicito:

> Hai mostrato questo report al tuo medico?

---

## 42. Exit survey

Quando un utente diventa inattivo:

> Non utilizzi l’app da un po’. Possiamo chiederti perché?

Opzioni:

```text
Mi dimentico di usarla
Richiede troppo tempo
Non mi è utile
Non capisco i dati
Preferisco segnarmi tutto altrove
Non sto effettuando misurazioni
Problemi tecnici
Altro
```

Questo dato sarà probabilmente più utile del semplice numero di churn.

---

## 43. Metriche collegate direttamente alle schermate

### Onboarding

Completion rate.

### Daily check-in

Completion rate + tempo medio.

### Home

Percentuale di utenti che avvia un check-in.

### Reminder

Reminder → check-in conversion.

### Storico

Percentuale di utenti che consulta almeno una volta i trend.

### Questionari

Completion rate.

### Report

Report generation rate.

### Condivisione

Report share/export rate.

### Prodotto complessivo

D7 / D30 / D60 / D90 retention.

---

## 44. Wireframe Home

```text
┌────────────────────────────┐
│ Buongiorno, Mario          │
│                            │
│ Come stai oggi?            │
│                            │
│ ┌────────────────────────┐ │
│ │   FAI IL CHECK-IN      │ │
│ │      ~ 1 minuto        │ │
│ └────────────────────────┘ │
│                            │
│ Terapia                    │
│                            │
│ ✓ Mattina                  │
│ ○ Sera                     │
│                            │
│ ────────────────────────── │
│                            │
│ Ultimi 7 giorni            │
│                            │
│ Respiro                    │
│ Come al solito             │
│                            │
│ SpO₂ media                 │
│ 94%                        │
│                            │
│ [ Vedi andamento ]         │
│                            │
└────────────────────────────┘
```

---

## 45. Wireframe Check-in

```text
┌────────────────────────────┐
│ Check-in di oggi           │
│                            │
│ Come va il respiro?        │
│                            │
│ 😃  🙂  😐  😟  😣        │
│                            │
│ Tosse                      │
│ ○ ○ ● ○ ○                  │
│                            │
│ Espettorato                │
│ [ No ] [ Sì ]              │
│                            │
│ SpO₂                       │
│ [   94   ] %               │
│                            │
│ Battiti                    │
│ [   76   ] bpm             │
│                            │
│ Terapia mattutina          │
│ [ ✓ Assunta ]              │
│                            │
│ ┌────────────────────────┐ │
│ │        SALVA           │ │
│ └────────────────────────┘ │
└────────────────────────────┘
```

---

## 46. MVP effettivo

Se dovessimo ridurlo ancora di più, la prima release potrebbe contenere soltanto:

1. Account.
2. Onboarding.
3. Daily check-in.
4. Terapia.
5. CAT.
6. Storico 30/90 giorni.
7. Report PDF.
8. Reminder.
9. Profilo/privacy.

Sono probabilmente sufficienti per validare l’intera idea.

---

## 47. Cose da rimandare esplicitamente

Non inserirei nella prima release:

- chatbot;
- AI;
- teleconsulto;
- chat con medico;
- portale medico;
- caregiver multi-account;
- Apple Health;
- Health Connect;
- Bluetooth;
- saturimetri integrati;
- spirometri;
- ecommerce;
- marketplace;
- pharma;
- social/community;
- gamification;
- prediction;
- clinical alerts.

La domanda dell’MVP rimane:

> Un paziente BPCO registra con continuità i propri dati perché riceve abbastanza valore dallo storico e dal report per il medico?

Tutto il resto viene dopo.
