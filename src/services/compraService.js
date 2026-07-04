const pool = require("../db/connection");

async function criar(dados) {
  const {
    fornecedor_id,
    itens
  } = dados;

  const fornecedor =
    await pool.query(
      `
      SELECT *
      FROM fornecedores
      WHERE id = $1
      `,
      [fornecedor_id]
    );

  if (fornecedor.rows.length === 0) {
    throw new Error(
      "Fornecedor não encontrado"
    );
  }

  const compra =
    await pool.query(
      `
      INSERT INTO compras
      (
        fornecedor_id,
        produtos_diferentes
      )
      VALUES
      ($1,$2)
      RETURNING *
      `,
      [
        fornecedor_id,
        itens.length
      ]
    );

  const compraId =
    compra.rows[0].id;

  for (const item of itens) {

    const produto =
      await pool.query(
        `
        SELECT *
        FROM produtos
        WHERE id = $1
        `,
        [item.produto_id]
      );

    if (
      produto.rows.length === 0
    ) {
      throw new Error(
        `Produto ${item.produto_id} não encontrado`
      );
    }

    await pool.query(
      `
      INSERT INTO itens_compra
      (
        compra_id,
        produto_id,
        quantidade
      )
      VALUES
      ($1,$2,$3)
      `,
      [
        compraId,
        item.produto_id,
        item.quantidade
      ]
    );

    await pool.query(
      `
      UPDATE produtos
      SET estoque = estoque + $1
      WHERE id = $2
      `,
      [
        item.quantidade,
        item.produto_id
      ]
    );
  }

  return compra.rows[0];
}

async function listar() {
  const result = await pool.query(`
    SELECT
      c.id,
      c.fornecedor_id,
      f.empresa AS fornecedor,
      c.data_hora,
      c.produtos_diferentes
    FROM compras c
    JOIN fornecedores f
      ON c.fornecedor_id = f.id
    ORDER BY c.id
  `);

  return result.rows;
}

async function buscarPorId(id) {
  const compra = await pool.query(
    `
    SELECT
      c.id,
      c.fornecedor_id,
      f.empresa AS fornecedor,
      c.data_hora,
      c.produtos_diferentes
    FROM compras c
    JOIN fornecedores f
      ON c.fornecedor_id = f.id
    WHERE c.id = $1
    `,
    [id]
  );

  if (compra.rows.length === 0) {
    return null;
  }

  const itens = await pool.query(
    `
    SELECT
      ic.produto_id,
      p.nome AS produto,
      ic.quantidade
    FROM itens_compra ic
    JOIN produtos p
      ON ic.produto_id = p.id
    WHERE ic.compra_id = $1
    `,
    [id]
  );

  return {
    ...compra.rows[0],
    itens: itens.rows
  };
}

module.exports = {
  criar,
  listar,
  buscarPorId
};