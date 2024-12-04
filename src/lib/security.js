const rateLimiter = new Map();

export function checkRateLimit(ip, maxAttempts = 5, windowMs = 60000) {
  const now = Date.now();
  const attempts = rateLimiter.get(ip) || [];
  const recentAttempts = attempts.filter((time) => now - time < windowMs);

  if (recentAttempts.length >= maxAttempts) {
    throw new Error("Too many attempts. Please try again later.");
  }

  recentAttempts.push(now);
  rateLimiter.set(ip, recentAttempts);
}

export function validateInput(password) {
  if (typeof password !== "string") {
    throw new TypeError("Password must be a string");
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
}
