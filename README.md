# cryptography-password-js

A secure password hashing and verification library for Node.js

## Other languages

- [Português](docs/README.pt-BR.md)

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Security](#security)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

### Installation

```bash
npm install cryptography-password-js
```

### Quick Start

```javascript
import { hashPassword, verifyPassword } from 'cryptography-password-js';

// Generate hash
const hash = await hashPassword("mypassword123");

// Verify password
const isValid = await verifyPassword("mypassword123", hash);`
```

### Features

- ✨ Secure hashing using scrypt + HMAC
- 🛡️ Built-in rate limiting
- 🔒 Timing attack protection
- 📝 Full TypeScript support

### Advanced Configuration

```javascript
const hash = await hashPassword("mypassword123", {
  keyLen: 64, // Key length in bytes
  N: 16384, // CPU/memory cost factor
  r: 8, // Block size parameter
  p: 1, // Parallelization factor
  maxmem: 64 * 1024 * 1024, // Maximum memory (64MB)
});
```

### User Registration

```javascript
import { hashPassword } from "cryptography-password-js";

async function registerUser(username, password) {
  try {
    const hashedPassword = await hashPassword(password);
    // Store username and hashedPassword in database
    return true;
  } catch (error) {
    console.error("Registration failed:", error.message);
    return false;
  }
}
```

### Password Comparison

```javascript
import { verifyPassword } from "cryptography-password-js";

const password = "mypassword123"; // User-provided password
const storedHash = "storedHashFromDatabase"; // Hash stored in the database

const isValid = await verifyPassword(password, storedHash);

if (isValid) {
  console.log("Password is correct!");
} else {
  console.log("Password is incorrect!");
}
```

### User Login Example

```javascript
import { hashPassword, verifyPassword } from "cryptography-password-js";

// User registration
const password = "mypassword123";
const hashedPassword = await hashPassword(password);

// Store `hashedPassword` in the database

// User login
const loginPassword = "mypassword123"; // User-provided password
const storedHash = "storedHashFromDatabase"; // Hash stored in the database

const isValid = await verifyPassword(loginPassword, storedHash);

if (isValid) {
  console.log("Login successful!");
} else {
  console.log("Password is incorrect!");
}
```

### Database Storage Requirements

```sql
-- Recommended schema
CREATE TABLE users (
  password VARCHAR(258) -- Required minimum: 258 characters for hash storage
);
```

## Benchmarks

```bash
## Results (100 iterations per password):
------------------------------------------
cryptography-password-js: 33.15ms (average)
bcryptjs: 67.82ms (average)

Difference: 51.12% faster
```

## Security

This library uses:

- scrypt for key derivation
- HMAC-SHA256 for additional protection
- Time-safe comparison to prevent timing attacks
- Rate limiting to prevent brute force

## License

MIT
