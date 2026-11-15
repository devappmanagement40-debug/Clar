import { normalizeRdcLocalPhone } from "./rdc-phone";

export function getManualDepositAccountNumber(
  countryCode: string,
  localPhone: string,
  formattedPhone: string,
): string {
  return countryCode.trim().toUpperCase() === "CD"
    ? normalizeRdcLocalPhone(localPhone)
    : formattedPhone;
}
