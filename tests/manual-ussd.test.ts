import assert from "node:assert/strict";
import test from "node:test";
import { buildTogocelManualUssdCode } from "../client/src/lib/manual-ussd";

test("builds the TMoney USSD code from the current admin-configured phone", () => {
  assert.equal(
    buildTogocelManualUssdCode({
      countryCode: "TG",
      operatorName: "TMoney",
      amount: 5000,
      recipientPhone: "73127420",
      countryPhonePrefix: "+228",
    }),
    "*145*5*5000*73127420#",
  );
  assert.equal(
    buildTogocelManualUssdCode({
      countryCode: "TG",
      operatorName: "TMoney",
      amount: 5000,
      recipientPhone: "90001122",
      countryPhonePrefix: "+228",
    }),
    "*145*5*5000*90001122#",
  );
  assert.equal(
    buildTogocelManualUssdCode({
      countryCode: "TG",
      operatorName: "Yas Togo (Togocel)",
      amount: 8000,
      recipientPhone: "+22897123456",
      countryPhonePrefix: "+228",
    }),
    "*145*5*8000*97123456#",
  );
});

test("does not show a Togocel USSD shortcut for other countries, links, or empty numbers", () => {
  const base = {
    operatorName: "TMoney",
    amount: 5000,
    recipientPhone: "73127420",
    countryPhonePrefix: "+228",
  };
  assert.equal(buildTogocelManualUssdCode({ ...base, countryCode: "BJ" }), "");
  assert.equal(buildTogocelManualUssdCode({ ...base, countryCode: "TG", paymentLink: "https://pay.example" }), "");
  assert.equal(buildTogocelManualUssdCode({ ...base, countryCode: "TG", recipientPhone: null }), "");
});
