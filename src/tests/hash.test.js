import { hashPassword, verifyPassword } from "../lib/hash.js";
import assert from "assert";
import { test } from "node:test";

test("Deve validar entradas corretamente", async () => {
  await assert.rejects(
    () => hashPassword("123"),
    /Password must be at least 8 characters long/
  );

  await assert.rejects(() => hashPassword(123), /Password must be a string/);
});

test("Deve implementar rate limiting", async () => {
  const ip = "192.168.1.1";
  const password = "senhaSegura123";
  const hash = await hashPassword(password);

  for (let i = 0; i < 5; i++) {
    await verifyPassword(password, hash, ip);
  }

  await assert.rejects(
    () => verifyPassword(password, hash, ip),
    /Too many attempts/
  );
});
