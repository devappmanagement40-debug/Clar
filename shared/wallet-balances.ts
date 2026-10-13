export interface WalletBalanceSummary {
  totalBalance: number;
  depositBalance: number;
  earningsBalance: number;
  legacyDepositBalance: number;
  legacyEarningsBalance: number;
  persistentDepositBalance: number;
  persistentEarningsBalance: number;
}

export interface WalletBalanceInputs {
  totalBalance: number | string;
  persistentDepositBalance: number | string;
  persistentEarningsBalance: number | string;
  approvedLegacyDepositPrincipal: number | string;
  historicalProductSpending: number | string;
  postActivationLegacyDepositDelta: number | string;
}

export interface WalletImpact {
  depositDelta: number;
  earningsDelta: number;
  legacyDepositDelta: number;
  legacyEarningsDelta: number;
}

export interface WalletAllocation extends WalletImpact {
  canSpend: boolean;
  amount: number;
  persistentDepositDelta: number;
  persistentEarningsDelta: number;
}

function toCents(value: number | string): number {
  const numeric = typeof value === "string" ? Number.parseFloat(value) : value;
  if (!Number.isFinite(numeric)) throw new Error("Montant de portefeuille invalide.");
  return Math.round(numeric * 100);
}

function fromCents(value: number): number {
  return value === 0 ? 0 : value / 100;
}

export function deriveWalletBalances(input: WalletBalanceInputs): WalletBalanceSummary {
  const total = toCents(input.totalBalance);
  const persistentDeposit = toCents(input.persistentDepositBalance);
  const persistentEarnings = toCents(input.persistentEarningsBalance);
  const approvedDeposit = toCents(input.approvedLegacyDepositPrincipal);
  const historicSpending = toCents(input.historicalProductSpending);
  const legacyDepositDelta = toCents(input.postActivationLegacyDepositDelta);

  if (
    total < 0 ||
    persistentDeposit < 0 ||
    persistentEarnings < 0 ||
    approvedDeposit < 0 ||
    historicSpending < 0 ||
    legacyDepositDelta > 0
  ) {
    throw new Error("Répartition de portefeuille incohérente.");
  }
  if (persistentDeposit < 0 || persistentEarnings < 0 || total < persistentDeposit + persistentEarnings) {
    throw new Error("Les soldes persistants dépassent le solde total.");
  }

  const legacyTotal = total - persistentDeposit - persistentEarnings;
  const protectedLegacyDeposit = Math.min(
    legacyTotal,
    Math.max(0, approvedDeposit - historicSpending + legacyDepositDelta),
  );
  const legacyEarnings = legacyTotal - protectedLegacyDeposit;

  return {
    totalBalance: fromCents(total),
    depositBalance: fromCents(persistentDeposit + protectedLegacyDeposit),
    earningsBalance: fromCents(persistentEarnings + legacyEarnings),
    legacyDepositBalance: fromCents(protectedLegacyDeposit),
    legacyEarningsBalance: fromCents(legacyEarnings),
    persistentDepositBalance: fromCents(persistentDeposit),
    persistentEarningsBalance: fromCents(persistentEarnings),
  };
}

export function allocatePurchase(
  wallets: WalletBalanceSummary,
  amount: number | string,
): WalletAllocation {
  const requested = toCents(amount);
  if (requested <= 0) throw new Error("Le montant de l'achat doit être positif.");

  let remaining = requested;
  const legacyDeposit = Math.min(remaining, toCents(wallets.legacyDepositBalance));
  remaining -= legacyDeposit;
  const persistentDeposit = Math.min(remaining, toCents(wallets.persistentDepositBalance));
  remaining -= persistentDeposit;
  const legacyEarnings = Math.min(remaining, toCents(wallets.legacyEarningsBalance));
  remaining -= legacyEarnings;
  const persistentEarnings = Math.min(remaining, toCents(wallets.persistentEarningsBalance));
  remaining -= persistentEarnings;

  const depositSpent = legacyDeposit + persistentDeposit;
  const earningsSpent = legacyEarnings + persistentEarnings;
  const legacyDepositSpent = -legacyDeposit;
  const legacyEarningsSpent = -legacyEarnings;

  return {
    canSpend: remaining === 0,
    amount: fromCents(requested),
    depositDelta: fromCents(-depositSpent),
    earningsDelta: fromCents(-earningsSpent),
    legacyDepositDelta: fromCents(legacyDepositSpent),
    legacyEarningsDelta: fromCents(legacyEarningsSpent),
    persistentDepositDelta: fromCents(-persistentDeposit),
    persistentEarningsDelta: fromCents(-persistentEarnings),
  };
}

export function allocateEarningsWithdrawal(
  wallets: WalletBalanceSummary,
  amount: number | string,
): WalletAllocation {
  const requested = toCents(amount);
  if (requested <= 0) throw new Error("Le montant du retrait doit être positif.");

  let remaining = requested;
  const legacyEarnings = Math.min(remaining, toCents(wallets.legacyEarningsBalance));
  remaining -= legacyEarnings;
  const persistentEarnings = Math.min(remaining, toCents(wallets.persistentEarningsBalance));
  remaining -= persistentEarnings;

  return {
    canSpend: remaining === 0,
    amount: fromCents(requested),
    depositDelta: 0,
    earningsDelta: fromCents(-legacyEarnings - persistentEarnings),
    legacyDepositDelta: 0,
    legacyEarningsDelta: fromCents(-legacyEarnings),
    persistentDepositDelta: 0,
    persistentEarningsDelta: fromCents(-persistentEarnings),
  };
}
