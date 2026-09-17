# BPCO Companion

App mobile per pazienti con BPCO: raccolta continuativa dello stato di salute, storico e report per il medico.

- **PRD**: `PRD.md`
- **Glossario di dominio**: `CONTEXT.md`
- **Decisioni (ADR)**: `docs/adr/`
- **Compliance / Technical File / GDPR**: `docs/compliance/README.md`

## Struttura

```
app/          Expo / React Native (iOS + Android)
backend/      API EU-sovereign (TypeScript, Node)
infra/        OpenTofu hosting-agnostic (vedi ADR-0002)
docs/         PRD, ADR, compliance, agent config
```

## Architettura (sintesi)

App Expo → backend EU su Exoscale (Postgres gestito, object storage, VM docker compose) → auth Verne Gate, crash Sentry EU, push/analytics self-hosted. Dettagli: `PRD.md` §9, ADR-0001..0004.

## Compliance

Evidenza e documentazione per un futuro Technical File MDR: **`docs/compliance/README.md`**. La spine (SBOM, test report, release firmate, audit log) è prodotta dalla pipeline CI dal day 0 (ADR-0004).

## Sviluppo

```bash
npm install
npm run lint       # eslint (tutti i workspace)
npm run typecheck  # tsc --noEmit
npm run test       # unit test
```