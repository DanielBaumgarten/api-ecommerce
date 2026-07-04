const pool = require("../db/connection");

async function listar() {
  const result = await pool.query(
    "SELECT * FROM categorias ORDER BY id"
  );

  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query(
    "SELECT * FROM categorias WHERE id = $1",
    [id]
  );

  return result.rows[0];
}

async function criar(nome, descricao) {
  const result = await pool.query(
    `
    INSERT INTO categorias (nome, descricao)
    VALUES ($1, $2)
    RETURNING *
    `,
    [nome, descricao]
  );

  return result.rows[0];
}

async function atualizar(id, nome, descricao) {
  const result = await pool.query(
    `
    UPDATE categorias
    SET nome = $1,
        descricao = $2
    WHERE id = $3
    RETURNING *
    `,
    [nome, descricao, id]
  );

  return result.rows[0];
}

async function excluir(id) {
  await pool.query(
    "DELETE FROM categorias WHERE id = $1",
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