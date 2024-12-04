import {
  scrypt as scryptCallback,
  randomBytes,
  timingSafeEqual,
  createHmac,
} from "crypto";
import { promisify } from "util";
import { DEFAULT_OPTIONS } from "../config/options.js";
import { validateInput, checkRateLimit } from "./security.js";

const scrypt = promisify(scryptCallback);

export async function hashPassword(password, options = {}) {
  try {
    validateInput(password);

    const opts = { ...DEFAULT_OPTIONS, ...options };
    const salt = randomBytes(32).toString("hex");

    const derivedKey = await scrypt(password, salt, opts.keyLen, {
      N: opts.N,
      r: opts.r,
      p: opts.p,
      maxmem: opts.maxmem,
    });

    const hmac = createHmac("sha256", salt).update(derivedKey).digest("hex");

    return `${salt}:${derivedKey.toString("hex")}:${hmac}`;
  } catch (error) {
    if (error instanceof TypeError) throw error;
    throw new Error(`Hash generation failed: ${error.message}`);
  }
}

export async function verifyPassword(password, storedHash, ip = "127.0.0.1") {
  try {
    validateInput(password);
    checkRateLimit(ip);

    const [salt, key, storedHmac] = storedHash.split(":");

    const derivedKey = await scrypt(
      password,
      salt,
      key.length / 2,
      DEFAULT_OPTIONS
    );
    const hmac = createHmac("sha256", salt).update(derivedKey).digest("hex");

    if (hmac !== storedHmac) return false;

    const keyBuffer = Buffer.from(key, "hex");
    return timingSafeEqual(derivedKey, keyBuffer);
  } catch (error) {
    throw new Error(`Verification failed: ${error.message}`);
  }
}
