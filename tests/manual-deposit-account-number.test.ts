import assert from "node:assert/strict";
import test from "node:test";
import { getManualDepositAccountNumber } from "../shared/manual-deposit-account-number";
import { depositSchema } from "../shared/schema";

test("manual RDC deposits submit the nine local digits expected by the server", () => {
  const accountNumber = getManualDepositAccountNumber(
    "CD",
    "990665835",
    "+243990665835",
  );

  assert.equal(accountNumber, "990665835");
  assert.equal(depositSchema.safeParse({
    amount: 5000,
    accountName: "Test Client",
    accountNumber,
    paymentMethod: "Airtel Money",
    country: "CD",
  }).success, true);
});

test("other manual deposit countries keep their formatted phone number", () => {
  assert.equal(
    getManualDepositAccountNumber("TG", "90123456", "+22890123456"),
    "+22890123456",
  );
});
