import assert from "node:assert/strict";
import { test } from "node:test";
import { hashAdminPin, verifyAdminPin } from "../server/admin-pin";

test("admin PINs are stored as bcrypt hashes and can be verified", async () => {
  const hash = await hashAdminPin("2468");

  assert.match(hash, /^\$2[aby]\$/);
  assert.notEqual(hash, "2468");
  assert.deepEqual(await verifyAdminPin("2468", hash), {
    valid: true,
    needsUpgrade: false,
  });
  assert.deepEqual(await verifyAdminPin("0000", hash), {
    valid: false,
    needsUpgrade: false,
  });
});

test("legacy plaintext admin PINs are marked for secure upgrade", async () => {
  assert.deepEqual(await verifyAdminPin("1357", "1357"), {
    valid: true,
    needsUpgrade: true,
  });
  assert.deepEqual(await verifyAdminPin("0000", "1357"), {
    valid: false,
    needsUpgrade: false,
  });
});
