# 03 — Design (IEC 62304)

> Placeholder. Design inputs/outputs, architettura software e lifecycle secondo IEC 62304. Da compilare quando la tracciabilità formale parte (Phase 4).

## Design inputs

*Requisiti software tracciati alle funzioni.* Fonte primaria oggi: `PRD.md`, `CONTEXT.md`, ADR-0001..0004.

## Architettura

- App (Expo/RN) → backend EU (Exoscale, ADR-0001) → Postgres gestito + object storage + VM docker compose (ADR-0002).
- Servizi di supporto: Verne Gate (auth), Sentry EU (crash), push/analytics self-hosted (ADR-0003).
- Diagramma: `PRD.md` §9.

## SOUP

Il provider cloud e i servizi di supporto sono SOUP sotto IEC 62304 §3.29 (ADR-0004). Inventario SOUP versionato per release: *collegare SBOM e record di release da `../evidence/`*.