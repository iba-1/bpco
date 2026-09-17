import { test } from "node:test";
import assert from "node:assert/strict";
import { it, en } from "./dictionaries.ts";

test("all locales define the same keys", () => {
  const itKeys = Object.keys(it).sort();
  const enKeys = Object.keys(en).sort();
  assert.deepEqual(itKeys, enKeys);
  assert.ok(itKeys.length > 0, "dictionaries should not be empty");
});

test("keys follow feature.screen.element.variant shape", () => {
  const pattern = /^[a-z]+\.[a-z]+\.[a-z]+(\.[a-z]+)*$/;
  for (const key of Object.keys(it)) {
    assert.match(key, pattern, `key "${key}" should be dotted feature.screen.element.variant`);
  }
});