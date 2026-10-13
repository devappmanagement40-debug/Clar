export const DAILY_BONUS_MIN = 25;
export const DAILY_BONUS_MAX = 100;
export const DAILY_BONUS_OUTCOME_COUNT = DAILY_BONUS_MAX - DAILY_BONUS_MIN + 1;

export function dailyBonusFromIndex(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= DAILY_BONUS_OUTCOME_COUNT) {
    throw new RangeError("Index de bonus quotidien invalide.");
  }

  return DAILY_BONUS_MIN + index;
}
