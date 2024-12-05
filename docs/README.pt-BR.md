# cryptography-password-js

Uma biblioteca segura para hash e verificação de senhas usando Node.js

## Outros idiomas

- [English](../README.md)

## Índice

- [Instalação](#instalação)
- [Início Rápido](#início-rápido)
- [Segurança](#segurança)
- [Exemplos](#exemplos)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

### Instalação

```bash
npm install cryptography-password-js
```

### Início Rápido

```javascript
import { hashPassword, verifyPassword } from "cryptography-password-js";

// Gerar hash
const hash = await hashPassword("minhasenha123");

// Verificar senha
const isValid = await verifyPassword("minhasenha123", hash);
```

### Recursos

- ✨ Hash seguro usando scrypt + HMAC
- 🛡️ Rate limiting embutido
- 🔒 Proteção contra ataques de timing
- 📝 Suporte completo a TypeScript

### Configurações Avançadas

```javascript
const hash = await hashPassword("minhasenha123", {
  keyLen: 64, // Tamanho da chave em bytes
  N: 16384, // Fator de custo CPU/memória
  r: 8, // Parâmetro de blocos
  p: 1, // Fator de paralelização
  maxmem: 64 * 1024 * 1024, // Memória máxima (64MB)
});
```

### Cadastro de Usuário

```javascript
import { hashPassword } from "cryptography-password-js";

async function cadastrarUsuario(usuario, senha) {
  try {
    const senhaHash = await hashPassword(senha);
    // Armazene usuario e senhaHash no banco de dados
    return true;
  } catch (erro) {
    console.error("Falha no cadastro:", erro.message);
    return false;
  }
}
```

### Comparação de Senha

```javascript
import { verifyPassword } from "cryptography-password-js";

const senha = "minhasenha123"; // Senha fornecida pelo usuário
const hashArmazenado = "hashDoBancoDeDados"; // Hash armazenado no banco de dados

const ehValida = await verifyPassword(senha, hashArmazenado);

if (ehValida) {
  console.log("Senha correta!");
} else {
  console.log("Senha incorreta!");
}
```

### Exemplo de Login

```javascript
import { hashPassword, verifyPassword } from "cryptography-password-js";

// Cadastro do usuário
const senha = "minhasenha123";
const senhaHash = await hashPassword(senha);

// Armazene `senhaHash` no banco de dados

// Login do usuário
const senhaLogin = "minhasenha123"; // Senha fornecida pelo usuário
const hashArmazenado = "hashDoBancoDeDados"; // Hash armazenado no banco de dados

const ehValida = await verifyPassword(senhaLogin, hashArmazenado);

if (ehValida) {
  console.log("Login bem-sucedido!");
} else {
  console.log("Senha incorreta!");
}
```

### Requisitos de armazenamento da base de dados

```sql
-- Esquema recomendado
CREATE TABLE users (
  password VARCHAR(258) -- Mínimo exigido: 258 caracteres para armazenamento de hash
);
```

## Benchmarks

```bash
## Resultados (100 iterações por senha):
------------------------------------------
cryptography-password-js: 33.15ms (média)
bcryptjs: 67.82ms (média)

Diferença: 51.12% mais rápido
```

## Segurança

Esta biblioteca utiliza:

- scrypt para derivação de chave
- HMAC-SHA256 para proteção adicional
- Comparação time-safe para prevenir ataques de timing
- Rate limiting para prevenir força bruta

## Licença

MIT
