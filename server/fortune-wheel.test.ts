import assert from "node:assert/strict";
import test from "node:test";
import type { FortuneWheelPrize } from "@shared/schema";
import {
  DEFAULT_FORTUNE_WHEEL_CONFIG,
  getUtcDayStart,
  parseFortuneWheelConfig,
  selectWeightedPrize,
} from "./fortune-wheel";

const prizes: FortuneWheelPrize[] = [
  { id: "d0c2a1f1-cad3-4678-ad3b-f47e9ff75e91", label: "Petit gain", amount: 100, weight: 2, isActive: true },
  { id: "fa19d68a-34fa-468e-8d1f-8ee994929b7b", label: "Grand gain", amount: 500, weight: 1, isActive: true },
  { id: "253ef2e8-4de7-4b32-8536-fd7876858605", label: "Désactivé", amount: 900, weight: 20, isActive: false },
];

test("configuration absent or invalid leaves the wheel safely disabled", () => {
  assert.deepEqual(parseFortuneWheelConfig(null), DEFAULT_FORTUNE_WHEEL_CONFIG);
  assert.deepEqual(parseFortuneWheelConfig("not-json"), DEFAULT_FORTUNE_WHEEL_CONFIG);
  assert.deepEqual(
    parseFortuneWheelConfig(JSON.stringify({ isEnabled: true, spinsPerDay: 1, prizes: [] })),
    DEFAULT_FORTUNE_WHEEL_CONFIG,
  );
});

test("weighted selection respects the configured ticket ranges and ignores inactive prizes", () => {
  assert.equal(selectWeightedPrize(prizes, 0).label, "Petit gain");
  assert.equal(selectWeightedPrize(prizes, 1).label, "Petit gain");
  assert.equal(selectWeightedPrize(prizes, 2).label, "Grand gain");
  assert.throws(() => selectWeightedPrize(prizes, 3), /ticket/i);
});

test("daily spin window starts at UTC midnight", () => {
  const now = new Date("2026-10-13T19:24:31.000Z");
  assert.equal(getUtcDayStart(now).toISOString(), "2026-10-13T00:00:00.000Z");
});
