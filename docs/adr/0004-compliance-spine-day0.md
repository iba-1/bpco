# ADR-0004 — Compliance spine day-0, QMS formale a Phase 4

Status: accepted

Dal primo giorno si costruisce la **spine compliance**:

- audit log immutabile e tamper-evident di ogni accesso ai dati (senza dati sanitari nel log);
- release firmate e versionate con provenance;
- GDPR/DPIA, data minimization, cifratura, export (Art. 15/20), cancellazione (Art. 17, hard delete entro 30 giorni), gestione breach;
- CI-generated compliance evidence: SBOM, report di test, record di deployment immutabili, audit trail di pipeline;
- struttura documentale mappata al futuro Technical File MDR (ISO 13485, IEC 62304, ISO 14971).

Il **QMS formale** (ISO 13485 certificato, risk file ISO 14971, ciclo di vita IEC 62304 completo) parte solo a Phase 4, quando funzionalità device (telemonitoraggio, alert, predictive) rendono l'app un dispositivo medico.

Motivo: l'MVP è deliberatamente non-device (§15 PRD). Un QMS completo ora comprerebbe overhead senza obbligo regolatorio; la spine day-0 rende la certificazione futura additiva, non retrofittata.

Il provider cloud è SOUP sotto IEC 62304 §3.29: le sue certificazioni (ADR-0001) sono evidenza citata nel file, non sostituto delle obbligazioni del produttore (MDR Annex I §17.2/§17.4).