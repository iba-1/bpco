# ADR-0002 — IaC hosting-agnostico con OpenTofu

Status: accepted

Tutta l'infrastruttura è definita come codice con **OpenTofu** in uno split a due strati: uno strato adattatore sottile per il provider (VM, Postgres gestito, object storage, networking) e container OCI firmati provider-agnostici per l'app. Lo state risiede su storage S3-compatible in EU.

Nell'MVP **niente Kubernetes**: l'app gira come container OCI firmati su VM Exoscale tramite docker compose (o systemd), dietro un reverse proxy; Postgres e object storage restano gestiti. K8s è un'aggiunta pulita a Phase 3-4 se la scala lo richiede, ed è una decisione facilmente reversibile.

Motivo: IEC 62304 §8 (configuration management) esige configurazione riproducibile e versionata — il click-through nella console di un provider non soddisfa l'audit. La riproducibilità è garantita da OpenTofu + container firmati + record di deploy immutabili, senza il costo operativo di un cluster. Il layer sottile mantiene piccola la superficie SOUP, così un cambio provider è una rivalutazione limitata (ADR-0001).

OpenTofu è la scelta rispetto a Pulumi perché Linux Foundation-governed (neutrale, nessun venditore US), coerente con la postura di sovranità EU.