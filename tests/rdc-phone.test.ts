import assert from "node:assert/strict";
import test from "node:test";
import { depositSchema, loginSchema, registerSchema, walletSchema } from "../shared/schema";
import {
  isRdcLocalPhoneNumber,
  isRdcLoginPhoneAuthorized,
  isValidRdcPhoneTransportValue,
  isValidRdcLoginPhoneFormat,
  normalizeRdcLocalPhone,
} from "../shared/rdc-phone";

test("RDC local phone numbers require exactly nine digits", () => {
  assert.equal(isRdcLocalPhoneNumber("990665835"), true);
  assert.equal(isRdcLocalPhoneNumber("99066583"), false);
  assert.equal(isRdcLocalPhoneNumber("0990665835"), false);
  assert.equal(isRdcLocalPhoneNumber("+243990665835"), false);
});

test("legacy RDC numbers normalize without changing stored values", () => {
  assert.equal(normalizeRdcLocalPhone("0990665835"), "990665835");
  assert.equal(normalizeRdcLocalPhone("+243 990 665 835"), "990665835");
});

test("provider transport numbers accept local or +243 format only at nine digits", () => {
  assert.equal(isValidRdcPhoneTransportValue("990665835"), true);
  assert.equal(isValidRdcPhoneTransportValue("+243990665835"), true);
  assert.equal(isValidRdcPhoneTransportValue("0990665835"), false);
  assert.equal(isValidRdcPhoneTransportValue("+24399066583"), false);
});

test("customers use nine digits while login permits a separately authorized admin length", () => {
  const common = { country: "CD", password: "secret123" };
  assert.equal(
    registerSchema.safeParse({ ...common, fullName: "Test User", phone: "990665835" }).success,
    true,
  );
  assert.equal(
    registerSchema.safeParse({ ...common, fullName: "Test User", phone: "0990665835" }).success,
    false,
  );
  assert.equal(loginSchema.safeParse({ ...common, phone: "990665835" }).success, true);
  assert.equal(loginSchema.safeParse({ ...common, phone: "99066583" }).success, false);
  assert.equal(registerSchema.safeParse({ ...common, fullName: "Test User", phone: "1234567890" }).success, false);
  assert.equal(loginSchema.safeParse({ ...common, phone: "1234567890" }).success, true);
  assert.equal(isValidRdcLoginPhoneFormat("1234567890"), true);
  assert.equal(isRdcLoginPhoneAuthorized("1234567890", false), false);
  assert.equal(isRdcLoginPhoneAuthorized("1234567890", true), true);
});

test("deposit and withdrawal wallet schemas enforce nine-digit RDC numbers", () => {
  const deposit = {
    amount: 20_000,
    accountName: "Test User",
    country: "CD",
    paymentMethod: "Airtel Money",
  };
  assert.equal(depositSchema.safeParse({ ...deposit, accountNumber: "990665835" }).success, true);
  assert.equal(depositSchema.safeParse({ ...deposit, accountNumber: "0990665835" }).success, false);

  const wallet = {
    accountName: "Test User",
    paymentMethod: "Airtel Money",
    country: "CD",
  };
  assert.equal(walletSchema.safeParse({ ...wallet, accountNumber: "990665835" }).success, true);
  assert.equal(walletSchema.safeParse({ ...wallet, accountNumber: "99066583" }).success, false);
});
