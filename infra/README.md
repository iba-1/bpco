# Infra

Infrastructure-as-code for the BPCO Companion backend, defined with **OpenTofu** in a hosting-agnostic two-layer split (see `docs/adr/0002-opentofu-hosting-agnostic-iac.md`).

## Layout

- `provider/` — thin provider-adapter layer (Exoscale today): VM, managed Postgres, object storage, networking. This is the only provider-specific code.
- `stack/` — provider-agnostic composition: modules that describe *what* runs (containers, config), referencing the adapter.

## Getting started

Requires an Exoscale account and API keys (see `docs/agents/issue-tracker.md` ticket T02). Until credentials exist, workspaces can be planned against a local dry-run backend.

- State lives on EU S3-compatible storage (ADR-0002).
- Apply is only ever driven by CI via the deployment pipeline (immutable audit log, ADR-0004).

## Compliance

Infrastructure changes are governed by IEC 62304 §8 (configuration management): every change is version-controlled, reviewed, and recorded in the deployment audit log. See `docs/adr/0004-compliance-spine-day0.md`.