import test from "node:test";
import assert from "node:assert/strict";
import {
  getActiveCountryMethodNames,
  hasConfiguredCountryMethods,
  parseCountryMethodEntries,
} from "../shared/country-methods.ts";
import { getWithdrawalMethods, isAllowedWithdrawalMethod } from "../shared/withdrawal-methods.ts";

test("legacy country operator arrays remain active", () => {
  assert.deepEqual(
    getActiveCountryMethodNames('["Airtel Money","Moov"]'),
    ["Airtel Money", "Moov"],
  );
});

test("country methods can be disabled without deleting their configuration", () => {
  const stored = JSON.stringify([
    { name: "Airtel Money", isActive: true },
    { name: "Moov", isActive: false },
  ]);

  assert.deepEqual(parseCountryMethodEntries(stored), [
    { name: "Airtel Money", isActive: true },
    { name: "Moov", isActive: false },
  ]);
  assert.deepEqual(getActiveCountryMethodNames(stored), ["Airtel Money"]);
  assert.equal(hasConfiguredCountryMethods(stored), true);
});

test("malformed country method data fails closed", () => {
  assert.deepEqual(getActiveCountryMethodNames("{broken"), []);
  assert.equal(hasConfiguredCountryMethods("{broken"), false);
});

test("withdrawal methods are determined by country configuration, not country-code overrides", () => {
  assert.deepEqual(getWithdrawalMethods("CI", ["Moov"]), ["Moov"]);
  assert.equal(isAllowedWithdrawalMethod("CI", "Wave", ["Moov"]), false);
  assert.equal(isAllowedWithdrawalMethod("TD", "Airtel Money", ["Airtel Money", "Moov"]), true);
});
