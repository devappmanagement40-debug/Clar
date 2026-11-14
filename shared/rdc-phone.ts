export const RDC_LOCAL_PHONE_LENGTH = 9;
export const RDC_LOCAL_PHONE_EXAMPLE = "990665835";
export const RDC_LOCAL_PHONE_ERROR =
  `Le numéro doit contenir exactement ${RDC_LOCAL_PHONE_LENGTH} chiffres, par exemple ${RDC_LOCAL_PHONE_EXAMPLE}.`;

const rdcLocalPhonePattern = /^[0-9]{9}$/;

export function isRdcLocalPhoneNumber(value: string): boolean {
  return rdcLocalPhonePattern.test(value.trim());
}

export function normalizeRdcLocalPhone(value: string): string {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("00243") && digits.length > 9) {
    digits = digits.slice(5);
  } else if (digits.startsWith("243") && digits.length > 9) {
    digits = digits.slice(3);
  }

  if (digits.length === 10 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  return digits;
}

export function isValidRdcPhoneTransportValue(value: string): boolean {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("00243") && digits.length === 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("243") && digits.length === 12) {
    digits = digits.slice(3);
  }

  return rdcLocalPhonePattern.test(digits);
}
