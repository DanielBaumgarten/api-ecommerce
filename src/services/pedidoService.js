const pool = require("../db/connection");

async function criar(dados) {
  const {
    cliente_id,
    forma_pagamento,
    itens
  } = dados;

  const cliente = await pool.query(
    `
    SELECT *
    FROM clientes
    WHERE id = $1
    `,
    [cliente_id]
  );

  if (cliente.rows.length === 0) {
    const error = new Error(
      "Cliente não encontrado"
    );

    error.status = 404;

    throw error;
  }

  let valorTotal = 0;

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
      const error = new Error(
        `Produto ${item.produto_id} não encontrado`
      );

      error.status = 404;

      throw error;
    }

    const produtoAtual =
      produto.rows[0];

    if (
      produtoAtual.estoque <
      item.quantidade
    ) {
      const error = new Error(
        `Estoque insuficiente para ${produtoAtual.nome}`
      );

      error.status = 400;

      throw error;
    }

    valorTotal +=
      Number(produtoAtual.preco) *
      item.quantidade;
  }

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

  const pedidoId =
    pedido.rows[0].id;

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

async function listar() {
  const result = await pool.query(`
    SELECT
      p.id,
      p.cliente_id,
      c.nome AS cliente,
      p.data_hora,
      p.status,
      p.forma_pagamento,
      p.valor_total
    FROM pedidos p
    JOIN clientes c
      ON p.cliente_id = c.id
    ORDER BY p.id
  `);

  return result.rows;
}

async function buscarPorId(id) {
  const pedido = await pool.query(
    `
    SELECT
      p.id,
      p.cliente_id,
      c.nome AS cliente,
      p.data_hora,
      p.status,
      p.forma_pagamento,
      p.valor_total
    FROM pedidos p
    JOIN clientes c
      ON p.cliente_id = c.id
    WHERE p.id = $1
    `,
    [id]
  );

  if (pedido.rows.length === 0) {
    return null;
  }

  const itens = await pool.query(
    `
    SELECT
      ip.produto_id,
      pr.nome AS produto,
      ip.quantidade,
      ip.valor_unitario
    FROM itens_pedido ip
    JOIN produtos pr
      ON ip.produto_id = pr.id
    WHERE ip.pedido_id = $1
    `,
    [id]
  );

  return {
    ...pedido.rows[0],
    itens: itens.rows
  };
}

module.exports = {
  criar,
  listar,
  buscarPorId
};