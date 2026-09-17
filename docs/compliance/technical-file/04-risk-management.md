# 04 — Risk Management (ISO 14971)

> Placeholder. Risk file ISO 14971. Da costruire quando l'app diventa dispositivo medico (Phase 4, ADR-0004). Nessun risk file formale nell'MVP.

## Rischi già mitigati per design

Pur senza risk file formale, alcune decisioni architetturali sono già mitigation registrate negli ADR:

- **Non-diagnosi / non-alerting** → evita rischi di interpretazione clinica (PRD §8, §15).
- **Insight descrittivo, mai diagnostico** → confine linguistico (PRD §8).
- **Sovranità EU + data minimization** → rischi privacy/giurisdizionali (ADR-0001, ADR-0004).
- **SOUP provider** → superficie controllata e documentata (ADR-0004).

## Da fare

Risk file strutturato: hazard → sequence of events → risk assessment → mitigation → verification. Da agganciare a `../evidence/` e al risultato del pilot (PRD §14).