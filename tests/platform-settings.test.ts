import test from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_MINIMUM_DEPOSIT,
  DEFAULT_MINIMUM_WITHDRAWAL,
  DEPOSIT_AMOUNT_PRESETS,
  readPositiveIntegerSetting,
} from "../shared/platform-settings";

test("deposit amount presets match the configured choices", () => {
  assert.deepEqual(DEPOSIT_AMOUNT_PRESETS, [
    3000,
    8000,
    20000,
    50000,
    100000,
    200000,
    500000,
    1000000,
  ]);
});

test("minimum amount settings use admin values and fall back to platform defaults", () => {
  assert.equal(readPositiveIntegerSetting("4500", DEFAULT_MINIMUM_DEPOSIT), 4500);
  assert.equal(readPositiveIntegerSetting("1000", DEFAULT_MINIMUM_WITHDRAWAL), 1000);
  assert.equal(readPositiveIntegerSetting(undefined, DEFAULT_MINIMUM_DEPOSIT), 3000);
  assert.equal(readPositiveIntegerSetting("invalid", DEFAULT_MINIMUM_WITHDRAWAL), 1000);
});
