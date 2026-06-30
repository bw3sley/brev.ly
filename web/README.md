<p align="center">
  <img alt="Logo brev.ly" src=".github/logo.svg" width="200px" />
</p>

<p align="center">
  <a href="#-ideia">Ideia</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-configuração-do-ambiente">Configuração do ambiente</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>
</p>

## 💡 Ideia

O projeto consiste em uma interface web para o **brev.ly**, desenvolvida durante a **Pós-Graduação Full-Stack com IA** da [Rocketseat](https://rocketseat.com.br). Com ela, é possível cadastrar links encurtados, visualizar a lista de URLs, remover registros, exportar informações em CSV e consumir recursos fornecidos pela API do projeto.

## 🔧 Configuração do ambiente

### 1. Entre na pasta do frontend

```bash
cd web
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Crie um arquivo `.env.local` na raiz da pasta `web` com as seguintes variáveis

Você também pode copiar o conteúdo de `.env.local.example`.

```bash
VITE_FRONTEND_URL="http://localhost:5173"
VITE_BACKEND_URL="http://localhost:3333"
```

### 4. Inicie servidor de desenvolvimento

```bash
pnpm run dev
```

Aplicação roda em `http://localhost:5173`. Para funcionamento completo, o backend deve estar ativo em `http://localhost:3333`.

## 🚀 Tecnologias

- React
- Vite
- TypeScript
- TanStack Router
- TanStack Query
- React Hook Form
- Zod
- Tailwind CSS
- Biome
