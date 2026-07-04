const pool = require("../db/connection");

async function criar(dados) {
  const {
    cliente_id,
    forma_pagamento,
    itens
  } = dados;

  // Validar cliente

  const cliente = await pool.query(
    `
    SELECT *
    FROM clientes
    WHERE id = $1
    `,
    [cliente_id]
  );

  if (cliente.rows.length === 0) {
    throw new Error(
      "Cliente não encontrado"
    );
  }

  let valorTotal = 0;

  // Validar produtos e estoque

  for (const item of itens) {

    const produto = await pool.query(
      `
      SELECT *
      FROM produtos
      WHERE id = $1
      `,
      [item.produto_id]
    );

    if (produto.rows.length === 0) {
      throw new Error(
        `Produto ${item.produto_id} não encontrado`
      );
    }

    const produtoAtual =
      produto.rows[0];

    if (
      produtoAtual.estoque <
      item.quantidade
    ) {
      throw new Error(
        `Estoque insuficiente para ${produtoAtual.nome}`
      );
    }

    valorTotal +=
      Number(produtoAtual.preco) *
      item.quantidade;
  }

  // Criar pedido

  const pedido = await pool.query(
    `
    INSERT INTO pedidos
    (
      cliente_id,
      forma_pagamento,
      valor_total,
      status
    )
    VALUES
    ($1,$2,$3,'PENDENTE')
    RETURNING *
    `,
    [
      cliente_id,
      forma_pagamento,
      valorTotal
    ]
  );

  const pedidoId = pedido.rows[0].id;

  // Criar itens e atualizar estoque

  for (const item of itens) {

    const produto = await pool.query(
      `
      SELECT *
      FROM produtos
      WHERE id = $1
      `,
      [item.produto_id]
    );

    const produtoAtual =
      produto.rows[0];

    await pool.query(
      `
      INSERT INTO itens_pedido
      (
        pedido_id,
        produto_id,
        quantidade,
        valor_unitario
      )
      VALUES
      ($1,$2,$3,$4)
      `,
      [
        pedidoId,
        item.produto_id,
        item.quantidade,
        produtoAtual.preco
      ]
    );

    await pool.query(
      `
      UPDATE produtos
      SET estoque = estoque - $1
      WHERE id = $2
      `,
      [
        item.quantidade,
        item.produto_id
      ]
    );
  }

  return pedido.rows[0];
}

module.exports = {
  criar
};