import {
  fortuneWheelConfigSchema,
  type FortuneWheelConfig,
  type FortuneWheelPrize,
} from "@shared/schema";

export const FORTUNE_WHEEL_CONFIG_KEY = "fortuneWheelConfig";

export const DEFAULT_FORTUNE_WHEEL_CONFIG: FortuneWheelConfig = {
  isEnabled: false,
  spinsPerDay: 1,
  prizes: [],
};

export function parseFortuneWheelConfig(value: string | null | undefined): FortuneWheelConfig {
  if (!value) return DEFAULT_FORTUNE_WHEEL_CONFIG;

  try {
    const parsed = fortuneWheelConfigSchema.safeParse(JSON.parse(value));
    return parsed.success ? parsed.data : DEFAULT_FORTUNE_WHEEL_CONFIG;
  } catch {
    return DEFAULT_FORTUNE_WHEEL_CONFIG;
  }
}

export function getUtcDayStart(now: Date = new Date()): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export function selectWeightedPrize(
  prizes: FortuneWheelPrize[],
  ticket: number,
): FortuneWheelPrize {
  const activePrizes = prizes.filter((prize) => prize.isActive);
  const totalWeight = activePrizes.reduce((sum, prize) => sum + prize.weight, 0);

  if (!Number.isSafeInteger(ticket) || ticket < 0 || ticket >= totalWeight) {
    throw new Error("Le ticket du tirage est invalide.");
  }

  let threshold = ticket;
  for (const prize of activePrizes) {
    if (threshold < prize.weight) return prize;
    threshold -= prize.weight;
  }

  throw new Error("Aucun lot ne correspond au ticket du tirage.");
}
