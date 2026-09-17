# Compliance

Evidence and documentation mapped to a future MDR Technical File (see `docs/adr/0004-compliance-spine-day0.md`).

| Artifact | Producer | Location |
|---|---|---|
| SBOM per build artifact | CI (`sbom.yml`) | workflow artifact `sbom-*` |
| Automated test reports | CI (`ci.yml`) | workflow artifact `test-report-*` |
| Signed release + provenance | CI (`release.yml`) | GitHub Release |
| Deployment audit log | CI (`deploy.yml`) | GitHub workflow runs (immutable) |
| Risk / design docs | repo docs | `docs/adr/` |

## Audit log

Deployments append hash-chained, tamper-evident entries to `deployment-audit.log` on a dedicated `audit-log` branch (never `main`), driven by the reusable `deploy.yml` workflow. Each entry references the previous entry's commit hash, so tampering with any historical entry breaks the chain. The Git history of `audit-log` is the append-only store; the branch should be protected against history rewrite. Each entry records actor, commit SHA, workflow run, environment, release, and the ADR-0004 gate that was verified.

No health data ever enters these logs (see `CONTEXT.md`, "Dato sanitario"). Actual infrastructure changes (`tofu apply`) are driven by the T02 deployment workflow, which invokes this rail as its compliance gate.