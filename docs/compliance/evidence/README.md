# Compliance Evidence

Dove vivono le evidenze generate dalla pipeline. **Nessuna evidenza è duplicata qui**: questo README dice *dove* ogni artefatto è prodotto, archiviato e come si recupera. La fonte primaria è sempre la pipeline (T01); gli artefatti si estraggono su richiesta per consultazione o audit, non si committano nel repo.

## Indice artefatti

| Evidenza | Prodotta da | Dove vive | Recupero |
|---|---|---|---|
| SBOM (CycloneDX) | `sbom.yml` | workflow artifact `sbom` | `gh run download --artifact sbom` |
| Test report (junit + lcov) | `ci.yml` | workflow artifact `test-report` | `gh run download --artifact test-report` |
| Release firmata + provenance | `release.yml` | GitHub Release | `gh release download <tag>` |
| Deployment audit log | `deploy.yml` | branch `audit-log` | `git checkout audit-log` |
| ADR | repo | `docs/adr/` | git history |

## Ritenzione

- Artefatti CI: 90 giorni (impostato nei workflow).
- Audit log di deploy: permanente sul branch git dedicato (ADR-0004: ritenzione a lungo termine).
- Audit degli accessi ai dati (T11): 10 anni (PRD §12).
- Release: permanenti su GitHub.

## Mappatura al Technical File

Ogni evidenza è referenziata dal `../technical-file/` corrispondente:

- SBOM + release → `03-design.md` (SOUP), `06-cybersecurity.md`
- Test report → `05-verification.md`
- Audit log → `06-cybersecurity.md`
- ADR → `03-design.md`, `04-risk-management.md`