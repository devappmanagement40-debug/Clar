export const WITHDRAWAL_TIME_ZONE = "Africa/Kinshasa";
export const DEFAULT_WITHDRAWAL_START_HOUR = 9;
export const DEFAULT_WITHDRAWAL_END_HOUR = 19;

export function getKinshasaHour(now: Date = new Date()): number {
  const hour = new Intl.DateTimeFormat("en-GB", {
    timeZone: WITHDRAWAL_TIME_ZONE,
    hour: "2-digit",
    hourCycle: "h23",
  }).format(now);

  return Number(hour);
}

export function isWithinKinshasaWithdrawalHours(
  now: Date,
  startHour: number,
  endHour: number,
): boolean {
  if (
    !Number.isInteger(startHour) ||
    !Number.isInteger(endHour) ||
    startHour < 0 ||
    startHour > 23 ||
    endHour < 0 ||
    endHour > 23 ||
    startHour >= endHour
  ) {
    return false;
  }

  const currentHour = getKinshasaHour(now);
  return currentHour >= startHour && currentHour < endHour;
}
