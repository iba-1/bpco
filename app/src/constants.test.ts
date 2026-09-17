import { test } from "node:test";
import assert from "node:assert/strict";
import { APP_NAME } from "./constants.ts";

test("app name is set", () => {
  assert.equal(APP_NAME, "BPCO Companion");
});