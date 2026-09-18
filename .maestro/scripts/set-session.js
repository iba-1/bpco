// Maestro JS helper (runs in Maestro's sandbox): mint a pending OIDC state
// via the backend test seam (NODE_ENV != production) and store the deep link
// in output.callback so the flow can open it.
const baseUrl = typeof API_URL !== "undefined" && API_URL
  ? API_URL
  : "http://127.0.0.1:3000";
const response = http.post(baseUrl + "/auth/test/session", { body: "" });
if (response.status !== 200) {
  throw new Error("test session seed failed: " + response.status);
}
const data = json(response.body);
output.callback = "bpco://callback?code=" + data.code + "&state=" + data.state;