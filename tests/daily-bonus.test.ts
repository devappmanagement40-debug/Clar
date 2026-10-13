import assert from "node:assert/strict";
import test from "node:test";
import {
  DAILY_BONUS_MAX,
  DAILY_BONUS_MIN,
  DAILY_BONUS_OUTCOME_COUNT,
  dailyBonusFromIndex,
} from "../shared/daily-bonus";

test("daily pointage reward offers every whole amount from 25 to 100 F", () => {
  const outcomes = Array.from(
    { length: DAILY_BONUS_OUTCOME_COUNT },
    (_, index) => dailyBonusFromIndex(index),
  );

  assert.equal(outcomes[0], DAILY_BONUS_MIN);
  assert.equal(outcomes.at(-1), DAILY_BONUS_MAX);
  assert.equal(new Set(outcomes).size, DAILY_BONUS_OUTCOME_COUNT);
  assert.equal(outcomes.filter((amount) => amount === DAILY_BONUS_MAX).length, 1);
});

test("daily pointage reward rejects invalid random indexes", () => {
  assert.throws(() => dailyBonusFromIndex(-1), RangeError);
  assert.throws(() => dailyBonusFromIndex(DAILY_BONUS_OUTCOME_COUNT), RangeError);
  assert.throws(() => dailyBonusFromIndex(1.5), RangeError);
});
