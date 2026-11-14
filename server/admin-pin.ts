import bcrypt from "bcrypt";

export async function hashAdminPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, 12);
}

export async function verifyAdminPin(
  pin: string,
  storedPin: string,
): Promise<{ valid: boolean; needsUpgrade: boolean }> {
  if (/^\$2[aby]\$/.test(storedPin)) {
    return {
      valid: await bcrypt.compare(pin, storedPin),
      needsUpgrade: false,
    };
  }

  const valid = storedPin === pin;
  return { valid, needsUpgrade: valid };
}
