<p align="center">
  <img alt="Logo brev.ly" src=".github/logo.svg" width="200px" />
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#octocat-repositórios">Repositórios</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>
</p>

## 💻 Sobre o Projeto

O **brev.ly** é uma aplicação full stack para gerenciamento de links encurtados. O projeto foi desenvolvido durante a **Pós-Graduação Full-Stack com IA** da [Rocketseat](https://rocketseat.com.br) e permite criar links curtos, consultar links cadastrados, remover registros, contabilizar acessos e exportar listagens em CSV.

Repositório dividido em duas partes principais:

- **server**: API HTTP em Fastify com Drizzle ORM e PostgreSQL.
- **web**: interface React com Vite para consumir API e gerenciar links.

## :octocat: Repositórios

Cada pasta possui documentação própria com instruções de ambiente e execução:

- [server](./server/README.md)
- [web](./web/README.md)

## 🚀 Como Executar

1. Inicie backend seguindo instruções em [`server/README.md`](./server/README.md).
2. Inicie frontend seguindo instruções em [`web/README.md`](./web/README.md).
3. Acesse aplicação web em `http://localhost:5173`.
4. Acesse documentação da API em `http://localhost:3333/docs`.
