# 06 — Cybersecurity (IEC 81001-5-1, MDCG 2019-16)

> Placeholder. Ciclo di vita della cybersecurity per health software secondo IEC 81001-5-1 e MDCG 2019-16 Rev.1. Da compilare formalmente a Phase 4; gli elementi di sicurezza sono già presenti.

## Controlli già attivi (day 0)

- **Release firmate + provenance**: `release.yml` (cosign keyless + attestations).
- **SBOM per release**: `sbom.yml`, da `package-lock.json` (135+ componenti).
- **Audit di deploy immutabile**: `deploy.yml` → branch `audit-log` hash-chained.
- **Audit degli accessi ai dati**: *da costruire* — deliverable T11 (PRD §12 "logging", no dati sanitari nel log).
- **Least privilege / RLS**: previsto nel modello dati (backend Postgres, PRD §9).
- **Data minimization**: `../gdpr/`.

## Da fare a Phase 4

Threat model formale, vulnerability management, SOUP cybersecurity obligations (EN IEC 81001-5-1), notifiche MDCG 2019-16. Evidenza collegata: `../evidence/`.