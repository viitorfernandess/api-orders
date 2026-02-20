# API Orders

API de sistema de pedidos desenvolvida com Node.js e Express, utilizando armazenamento em memória (arrays) para simular regras de negócio reais.

## Objetivo do Projeto

Criar uma API que simule um sistema de compras, aplicando regras de negócio reais sem utilizar banco de dados.

## Tecnologias

- Node.js
- Express

## Entidades

### Produto
- id
- nome
- preco
- estoque

### Pedido
- id
- itens (productId e quantidade)
- total (calculado automaticamente)
- status (criado, pago, enviado)

## Regras de Negócio

- Não permitir estoque negativo
- Não permitir pagar pedido duas vezes
- Não permitir enviar pedido não pago
- Não permitir criar pedido com produto inexistente

## Como rodar o projeto

```bash
npm install
node src/server.js