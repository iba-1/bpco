# ADR-0003 — Servizi di supporto EU-managed

Status: accepted

I servizi di supporto sono scelti per mantenere i dati in giurisdizione EU:

- **Auth**: Verne Gate (Ory Kratos open-source hostato in Francia) — OIDC (email+password, Apple, Google), MFA, webhook HMAC. Essendo Kratos open-source, migrare a self-hosted in futuro è un cambio di configurazione, non una riscrittura.
- **Crash reporting**: Sentry con data residency EU (region Dublin/Frankfurt). I crash non contengono dati sanitari; la residenza EU chiude comunque la postura.
- **Push**: dispatcher **self-hosted** sul backend EU. La consegna finale del dispositivo passa comunque da APNs/FCM (Apple/Google) — infrastruttura non evitabile — ma l'orchestrazione e i token restano in-EU. Le alternative EU SaaS sono piccole/immature: rischio SOUP inaccettabile.
- **Analytics**: events API **self-hosted** su Postgres EU (eventi di prodotto, senza dati sanitari). Gli strumenti di web-analytics EU (Plausible, EuroMetrics) sono pensati per il web, non per eventi di prodotto mobile.

Motivo: preservare la postura EU-only (ADR-0001) senza dipendere da servizi US (Firebase, OneSignal, Sentry US).