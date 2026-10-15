export const DEFAULT_MINIMUM_DEPOSIT = 3000;
export const DEFAULT_MINIMUM_WITHDRAWAL = 1000;

export const DEPOSIT_AMOUNT_PRESETS = [
  3000,
  8000,
  20000,
  50000,
  100000,
  200000,
  500000,
  1000000,
] as const;

export function readPositiveIntegerSetting(value: unknown, fallback: number): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}
