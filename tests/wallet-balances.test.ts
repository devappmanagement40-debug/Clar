import assert from "node:assert/strict";
import test from "node:test";
import {
  allocateEarningsWithdrawal,
  allocatePurchase,
  deriveWalletBalances,
} from "../shared/wallet-balances";

test("derives historical wallet split without changing the pooled total", () => {
  const wallets = deriveWalletBalances({
    totalBalance: "1200.00",
    persistentDepositBalance: "0",
    persistentEarningsBalance: "0",
    approvedLegacyDepositPrincipal: "900",
    historicalProductSpending: "300",
    postActivationLegacyDepositDelta: "0",
  });

  assert.equal(wallets.totalBalance, 1200);
  assert.equal(wallets.depositBalance, 600);
  assert.equal(wallets.earningsBalance, 600);
});

test("routes a deposit credit to the deposit wallet and other credits to earnings", () => {
  const wallets = deriveWalletBalances({
    totalBalance: "1500",
    persistentDepositBalance: "250",
    persistentEarningsBalance: "150",
    approvedLegacyDepositPrincipal: "900",
    historicalProductSpending: "300",
    postActivationLegacyDepositDelta: "0",
  });

  assert.equal(wallets.depositBalance, 850);
  assert.equal(wallets.earningsBalance, 650);
});

test("purchase consumes deposit funds first, then withdrawable earnings", () => {
  const wallets = deriveWalletBalances({
    totalBalance: "1000",
    persistentDepositBalance: "200",
    persistentEarningsBalance: "100",
    approvedLegacyDepositPrincipal: "600",
    historicalProductSpending: "100",
    postActivationLegacyDepositDelta: "0",
  });
  const allocation = allocatePurchase(wallets, 850);

  assert.equal(allocation.canSpend, true);
  assert.equal(allocation.depositDelta, -700);
  assert.equal(allocation.earningsDelta, -150);
  assert.equal(allocation.persistentDepositDelta, -200);
  assert.equal(allocation.persistentEarningsDelta, 0);
  assert.equal(allocation.legacyDepositDelta, -500);
  assert.equal(allocation.legacyEarningsDelta, -150);
});

test("withdrawal allocation only consumes earnings and rejects insufficient amount", () => {
  const wallets = deriveWalletBalances({
    totalBalance: "1000",
    persistentDepositBalance: "400",
    persistentEarningsBalance: "100",
    approvedLegacyDepositPrincipal: "350",
    historicalProductSpending: "100",
    postActivationLegacyDepositDelta: "0",
  });

  const allocation = allocateEarningsWithdrawal(wallets, 350);
  assert.equal(allocation.canSpend, true);
  assert.equal(allocation.depositDelta, 0);
  assert.equal(allocation.earningsDelta, -350);
  assert.equal(allocation.persistentEarningsDelta, -100);
  assert.equal(allocation.legacyEarningsDelta, -250);

  assert.equal(allocateEarningsWithdrawal(wallets, 351).canSpend, false);
});
