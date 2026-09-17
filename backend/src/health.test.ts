import { test } from "node:test";
import assert from "node:assert/strict";
import { health } from "./health.ts";

test("health reports the service as ok", () => {
  const status = health();
  assert.equal(status.service, "bpco-backend");
  assert.equal(status.status, "ok");
});

test("health timestamp is a valid ISO date", () => {
  const status = health();
  assert.ok(!Number.isNaN(Date.parse(status.timestamp)));
});