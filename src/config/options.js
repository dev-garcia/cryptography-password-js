export const DEFAULT_OPTIONS = {
  keyLen: 64,
  N: 16384,
  r: 8,
  p: 1,
  maxmem: 64 * 1024 * 1024,
};

export const RATE_LIMIT_OPTIONS = {
  maxAttempts: 5,
  windowMs: 60000,
};
