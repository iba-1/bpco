## Agent skills

### Issue tracker

Issues and specs live as GitHub issues (via the `gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Five default labels matching the canonical roles: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` plus `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### Compliance docs

Compliance evidence and documentation mapped to a future MDR Technical File live in `docs/compliance/` (see `docs/compliance/README.md`). When writing code that touches health data or releases, reference the day-0 compliance spine (ADR-0004) — SBOM, test reports, signed releases, and the immutable audit log on the `audit-log` branch.