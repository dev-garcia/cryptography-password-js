export interface HashOptions {
  keyLen?: number;
  N?: number;
  r?: number;
  p?: number;
  maxmem?: number;
}

export interface RateLimitOptions {
  maxAttempts?: number;
  windowMs?: number;
}

export declare function hashPassword(
  password: string,
  options?: HashOptions
): Promise<string>;
export declare function verifyPassword(
  password: string,
  storedHash: string,
  ip?: string
): Promise<boolean>;
