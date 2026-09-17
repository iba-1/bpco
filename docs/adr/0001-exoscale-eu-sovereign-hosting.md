# ADR-0001 — EU-sovereign hosting su Exoscale

Status: accepted

Il backend (Postgres, object storage, Kubernetes) è ospitato su **Exoscale** (Svizzera, ISO 27001, SOC 2, giurisdizione adeguata all'UE) invece che su un hyperscaler US o su un provider US con region EU.

Motivo: i dati sanitari devono restare in giurisdizione UE/adeguata senza esposizione a CLOUD Act/FISA. Il provider è SOUP sotto IEC 62304 (ADR-0004): le sue certificazioni sono evidenza citata nel futuro Technical File, non un trasferimento di responsabilità regolatoria, che resta del produttore.

La scelta è resa reversibile dall'IaC hosting-agnostico (ADR-0002): un futuro swap di provider è una rivalutazione circoscritta, non una riscrittura.