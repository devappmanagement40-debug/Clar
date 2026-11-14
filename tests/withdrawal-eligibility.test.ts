import assert from "node:assert/strict";
import test from "node:test";
import { hasActiveWithdrawalProduct } from "../shared/withdrawal-eligibility";

test("withdrawal requires an active product with remaining days", () => {
  assert.equal(
    hasActiveWithdrawalProduct([{ isActive: true, daysRemaining: 1 }]),
    true,
  );
  assert.equal(
    hasActiveWithdrawalProduct([{ isActive: true, daysRemaining: 0 }]),
    false,
  );
  assert.equal(
    hasActiveWithdrawalProduct([{ isActive: false, daysRemaining: 30 }]),
    false,
  );
  assert.equal(hasActiveWithdrawalProduct([]), false);
});
