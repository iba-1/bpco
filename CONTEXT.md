# BPCO Companion

App mobile per pazienti con BPCO: raccolta continuativa di dati sullo stato di salute, storico consultabile e report condivisibile con il medico.

## Language

**Check-in**:
Registrazione giornaliera di sintomi, parametri e aderenza alla terapia da parte del paziente.
_Avoid_: Diario, Log giornaliero

**Respiro**:
Sintomo respiratorio valutato con scala soggettiva a 5 punti durante il check-in giornaliero (molto bene / bene / come al solito / peggio / molto peggio). Strumento distinto da mMRC.
_Avoid_: Dispnea, Scala mMRC giornaliera

**mMRC**:
Questionario validato (0-4) sulla dispnea, somministrato periodicamente. Strumento distinto dalla scala giornaliera "Respiro".
_Avoid_: Scala respiro

**CAT (COPD Assessment Test)**:
Questionario validato (0-40) sull'impatto della BPCO, somministrato periodicamente (ipotesi mensile).
_Avoid_: Test BPCO, Questionario sintomi

**Tosse**:
Sintomo registrato nel check-in con scala a 5 punti (nessuna / leggera / moderata / forte / molto forte).
_Avoid_: Colpo di tosse

**Espettorato**:
Sintomo registrato nel check-in come presenza (No/Sì) con colore opzionale.
_Avoid_: Catarro, Muco

**Stato generale**:
Percezione globale del paziente rispetto al solito (meglio / come al solito / peggio).
_Avoid_: Umore, Benessere

**Parametro**:
Misurazione oggettiva opzionale inserita nel check-in: SpO₂, frequenza cardiaca, temperatura.
_Avoid_: Metrica, Valore vitale

**Terapia**:
Insieme di farmaci e dosaggi configurati dal paziente, con slot orari (mattina / pomeriggio / sera). L'app ricorda ciò che il paziente ha inserito, senza validarlo.
_Avoid_: Piano terapeutico, Prescrizione

**Aderenza dichiarata**:
Indicazione da parte del paziente se la terapia prevista è stata assunta, per slot orario. Non verificata né valutata dall'app.
_Avoid_: Compliance, Aderenza oggettiva

**Timeline**:
Vista storica delle registrazioni (sintomi, parametri, aderenza, questionari).
_Avoid_: Storico grafici, Cronologia

**Report**:
PDF generato on-device su un periodo selezionato (30/90 giorni, personalizzato), da condividere con il medico tramite share sheet.
_Avoid_: Riepilogo medico, Export PDF

**Prepara la visita**:
Flusso pre-visita che raccoglie cambiamenti, episodi e domande, e genera il report per la visita.
_Avoid_: Preparazione visita medica, Pre-visita

**Episodio**:
Evento rilevante nel periodo: visita non programmata, accesso al pronto soccorso, ricovero, modifica della terapia.
_Avoid_: Evento clinico, Incidente

**Reminder**:
Promemoria configurabile e disattivabile (check-in, terapia, questionari, preparazione visita).
_Avoid_: Notifica, Promemoria automatico

**Dato sanitario**:
Dato personale relativo alla salute del paziente, soggetto a GDPR e data minimization.
_Avoid_: Dato clinico, PHI

**Insight descrittivo**:
Descrizione oggettiva di una variazione nei dati (es. "media inferiore rispetto ai 7 giorni precedenti"), senza attribuire significato clinico.
_Avoid_: Insight clinico, Interpretazione

**Onboarding**:
Sequenza iniziale di creazione account, consensi, profilo, terapia e reminder.
_Avoid_: Registrazione, Setup iniziale