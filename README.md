# API E-commerce

## Sobre o Projeto

A **API E-commerce** é uma aplicação RESTful desenvolvida com **Node.js**, **Express** e **PostgreSQL**, criada para simular o funcionamento de um sistema de comércio eletrônico.

O projeto contempla autenticação de usuários, gerenciamento de produtos, clientes, fornecedores, controle de estoque, registro de pedidos e compras, além de documentação interativa utilizando Swagger.

---

# Objetivos

Este projeto foi desenvolvido com o objetivo de aplicar conceitos de:

- APIs RESTful
- Arquitetura em camadas
- Banco de Dados Relacional
- PostgreSQL
- Autenticação JWT
- Regras de Negócio
- Controle de Estoque
- Documentação de APIs
- Tratamento Global de Erros

---

# Tecnologias Utilizadas

## Backend

- Node.js
- Express

## Banco de Dados

- PostgreSQL
- pg

## Segurança

- bcrypt
- jsonwebtoken (JWT)

## Configuração

- dotenv
- cors

## Desenvolvimento

- nodemon

## Documentação

- swagger-ui-express
- swagger-jsdoc

---

# Estrutura do Projeto

src
│
├── controllers
├── services
├── routes
├── middlewares
├── docs
├── db
│
├── app.js
└── server.js