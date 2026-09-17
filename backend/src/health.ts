export interface HealthStatus {
  service: "bpco-backend";
  status: "ok";
  timestamp: string;
}

export function health(): HealthStatus {
  return {
    service: "bpco-backend",
    status: "ok",
    timestamp: new Date().toISOString(),
  };
}