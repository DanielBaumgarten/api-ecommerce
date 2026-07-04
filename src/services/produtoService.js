const pool = require("../db/connection");

async function listar() {
  const result = await pool.query(`
    SELECT
      p.*,
      c.nome AS categoria,
      m.nome AS marca
    FROM produtos p
    JOIN categorias c
      ON p.categoria_id = c.id
    JOIN marcas m
      ON p.marca_id = m.id
    ORDER BY p.id
  `);

  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query(
    `
    SELECT *
    FROM produtos
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}

async function criar(
  nome,
  preco,
  descricao,
  estoque,
  categoria_id,
  marca_id
) {
  const result = await pool.query(
    `
    INSERT INTO produtos
    (
      nome,
      preco,
      descricao,
      estoque,
      categoria_id,
      marca_id
    )
    VALUES
    ($1,$2,$3,$4,$5,$6)
    RETURNING *
    `,
    [
      nome,
      preco,
      descricao,
      estoque,
      categoria_id,
      marca_id
    ]
  );

  return result.rows[0];
}

async function atualizar(
  id,
  nome,
  preco,
  descricao,
  estoque,
  categoria_id,
  marca_id
) {
  const result = await pool.query(
    `
    UPDATE produtos
    SET
      nome = $1,
      preco = $2,
      descricao = $3,
      estoque = $4,
      categoria_id = $5,
      marca_id = $6
    WHERE id = $7
    RETURNING *
    `,
    [
      nome,
      preco,
      descricao,
      estoque,
      categoria_id,
      marca_id,
      id
    ]
  );

  return result.rows[0];
}

async function excluir(id) {
  await pool.query(
    "DELETE FROM produtos WHERE id = $1",
    [id]
  );
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir
};