import { performance } from "perf_hooks";
import { hashPassword } from "../lib/hash.js";
import bcrypt from "bcryptjs";

async function benchmark() {
  console.log("Benchmarking hash password implementations\n");

  const passwords = [
    "senhaSegura123",
    "outraSenhaComplexa!@#",
    "maisUmaSenhaGrande123!@#",
  ];

  const iterations = 100;
  const results = {
    ourImpl: [],
    bcrypt: [],
  };

  for (let i = 0; i < iterations; i++) {
    for (const password of passwords) {
      // cryptography-password-js
      const start1 = performance.now();
      await hashPassword(password);
      results.ourImpl.push(performance.now() - start1);

      // bcryptjs
      const start2 = performance.now();
      await bcrypt.hash(password, 10);
      results.bcrypt.push(performance.now() - start2);
    }
  }

  const avgOurs =
    results.ourImpl.reduce((a, b) => a + b) / results.ourImpl.length;
  const avgBcrypt =
    results.bcrypt.reduce((a, b) => a + b) / results.bcrypt.length;

  console.log(`Resultados (${iterations} iterações por senha):`);
  console.log(`------------------------------------------`);
  console.log(`cryptography-password-js: ${avgOurs.toFixed(2)}ms (média)`);
  console.log(`bcryptjs: ${avgBcrypt.toFixed(2)}ms (média)`);
  console.log(
    `\nDiferença: ${(((avgBcrypt - avgOurs) / avgBcrypt) * 100).toFixed(
      2
    )}% mais ${avgOurs < avgBcrypt ? "rápido" : "lento"}`
  );
}

benchmark();
