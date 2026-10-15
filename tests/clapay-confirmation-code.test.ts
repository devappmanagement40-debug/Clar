import assert from "node:assert/strict";
import test from "node:test";
import { extractClapayConfirmationCode } from "../server/clapay";

test("extracts a nested NITA confirmation code from Clapay's response", () => {
  assert.equal(
    extractClapayConfirmationCode({
      success: true,
      data: { confirmation_code: "  048219  " },
      signature: "merchant-transaction-signature",
    }),
    "048219",
  );
});

test("recognizes common confirmation-code field names without exposing signatures", () => {
  assert.equal(
    extractClapayConfirmationCode({ result: { paymentCode: 638204 } }),
    "638204",
  );
  assert.equal(
    extractClapayConfirmationCode({ code: "200", signature: "transaction-reference" }),
    undefined,
  );
});

test("uses the configured response path when Clapay names the code differently", () => {
  assert.equal(
    extractClapayConfirmationCode(
      { result: { nita_receipt: { ticket: "NT-827341" } } },
      "result.nita_receipt.ticket",
    ),
    "NT-827341",
  );
});

test("ignores empty, oversized, and non-scalar confirmation values", () => {
  assert.equal(extractClapayConfirmationCode({ confirmation_code: " " }), undefined);
  assert.equal(extractClapayConfirmationCode({ confirmation_code: "x".repeat(81) }), undefined);
  assert.equal(extractClapayConfirmationCode({ confirmation_code: { value: "1234" } }), undefined);
});
