/**
 * Adds the selected amount only to the Wave checkout URL.
 * Other countries and payment providers keep their configured URL unchanged.
 */
export function withCoteDIvoireWaveAmount(
  paymentLink: string | null | undefined,
  amount: number,
  countryCode: string,
): string | null | undefined {
  if (!paymentLink || countryCode.trim().toUpperCase() !== "CI") return paymentLink;
  if (!Number.isSafeInteger(amount) || amount <= 0) return paymentLink;

  try {
    const url = new URL(paymentLink);
    if (url.protocol !== "https:" || url.hostname !== "pay.wave.com") return paymentLink;
    url.searchParams.set("amount", String(amount));
    return url.toString();
  } catch {
    return paymentLink;
  }
}
