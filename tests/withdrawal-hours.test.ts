import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_WITHDRAWAL_END_HOUR,
  DEFAULT_WITHDRAWAL_START_HOUR,
  getKinshasaHour,
  isWithinKinshasaWithdrawalHours,
} from "../shared/withdrawal-hours";

test("withdrawal schedule uses Kinshasa time rather than the runtime timezone", () => {
  assert.equal(getKinshasaHour(new Date("2026-01-15T08:00:00.000Z")), 9);
});

test("withdrawal hours open at 09:00 Kinshasa time", () => {
  assert.equal(
    isWithinKinshasaWithdrawalHours(
      new Date("2026-01-15T08:00:00.000Z"),
      DEFAULT_WITHDRAWAL_START_HOUR,
      DEFAULT_WITHDRAWAL_END_HOUR,
    ),
    true,
  );
});

test("withdrawal hours close at 19:00 Kinshasa time", () => {
  assert.equal(
    isWithinKinshasaWithdrawalHours(
      new Date("2026-01-15T18:00:00.000Z"),
      DEFAULT_WITHDRAWAL_START_HOUR,
      DEFAULT_WITHDRAWAL_END_HOUR,
    ),
    false,
  );
});

test("withdrawals remain closed before 09:00 Kinshasa time", () => {
  assert.equal(
    isWithinKinshasaWithdrawalHours(
      new Date("2026-01-15T07:59:00.000Z"),
      DEFAULT_WITHDRAWAL_START_HOUR,
      DEFAULT_WITHDRAWAL_END_HOUR,
    ),
    false,
  );
});
