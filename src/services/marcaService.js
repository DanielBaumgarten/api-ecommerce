const pool = require("../db/connection");

async function listar() {
  const result = await pool.query(
    "SELECT * FROM marcas ORDER BY id"
  );

  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query(
    "SELECT * FROM marcas WHERE id = $1",
    [id]
  );

  return result.rows[0];
}

async function criar(nome, url_logo) {
  const result = await pool.query(
    `
    INSERT INTO marcas
    (
      nome,
      url_logo
    )
    VALUES
    ($1,$2)
    RETURNING *
    `,
    [nome, url_logo]
  );

  return result.rows[0];
}

async function atualizar(
  id,
  nome,
  url_logo
) {
  const result = await pool.query(
    `
    UPDATE marcas
    SET
      nome = $1,
      url_logo = $2
    WHERE id = $3
    RETURNING *
    `,
    [
      nome,
      url_logo,
      id
    ]
  );

  return result.rows[0];
}

async function excluir(id) {
  await pool.query(
    "DELETE FROM marcas WHERE id = $1",
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