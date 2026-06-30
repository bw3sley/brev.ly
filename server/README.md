<p align="center">
  <img alt="Logo brev.ly" src=".github/logo.svg" width="200px" />
</p>

<p align="center">
  <a href="#-ideia">Ideia</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-configuração-do-ambiente">Configuração do ambiente</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>
</p>

## 💡 Ideia

O projeto consiste em uma API para o **brev.ly**, desenvolvida durante a **Pós-Graduação Full-Stack com IA** da [Rocketseat](https://rocketseat.com.br). Ela é responsável por criar, listar, excluir e exportar links encurtados. Também registra a quantidade de acessos de cada link e expõe documentação HTTP para facilitar a integração com o frontend.

## 🔧 Configuração do ambiente

### 1. Entre na pasta do backend

```bash
cd server
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Crie um arquivo `.env` na raiz da pasta `server` com as seguintes variáveis

Você também pode copiar o conteúdo de `.env.example`.

```bash
DATABASE_URL=postgresql://docker:docker@localhost:5432/brevly
PORT=3333
NODE_ENV=development
CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL="https://storage.com/bucket"
```

### 4. Suba banco de dados local com Docker

```bash
docker compose up -d
```

### 5. Execute as migrações

```bash
pnpm run db:migrate
```

### 6. Opcional: popule o banco com dados iniciais

```bash
pnpm run db:seed
```

### 7. Inicie servidor de desenvolvimento

```bash
pnpm run dev
```

API roda em `http://localhost:3333` e documentação Swagger fica em `http://localhost:3333/docs`.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Fastify
- Zod
- Drizzle ORM
- PostgreSQL
- Docker
- Vitest
- Biome
