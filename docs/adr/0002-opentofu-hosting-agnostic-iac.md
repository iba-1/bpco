# ADR-0002 — IaC hosting-agnostico con OpenTofu

Status: accepted

Tutta l'infrastruttura è definita come codice con **OpenTofu** in uno split a due strati: uno strato adattatore sottile per il provider (cluster, Postgres, object storage, networking) e container/Helm provider-agnostici per l'app. Lo state risiede su storage S3-compatible in EU.

Motivo: IEC 62304 §8 (configuration management) esige configurazione riproducibile e versionata — il click-through nella console di un provider non soddisfa l'audit. Il layer sottile mantiene piccola la superficie SOUP, così un cambio provider è una rivalutazione limitata (ADR-0001).

OpenTofu è la scelta rispetto a Pulumi perché Linux Foundation-governed (neutrale, nessun venditore US), coerente con la postura di sovranità EU.