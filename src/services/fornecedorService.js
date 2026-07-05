const pool = require("../db/connection");

async function listar() {
  const result = await pool.query(`
    SELECT
      id,
      empresa,
      cnpj,
      telefone,
      email
    FROM fornecedores
    ORDER BY id
  `);

  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query(
    `
    SELECT
      id,
      empresa,
      cnpj,
      telefone,
      email
    FROM fornecedores
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}

async function criar(
  empresa,
  cnpj,
  telefone,
  email
) {
  const result = await pool.query(
    `
    INSERT INTO fornecedores
    (
      empresa,
      cnpj,
      telefone,
      email
    )
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `,
    [
      empresa,
      cnpj,
      telefone,
      email
    ]
  );

  return result.rows[0];
}

async function atualizar(
  id,
  empresa,
  cnpj,
  telefone,
  email
) {
  const result = await pool.query(
    `
    UPDATE fornecedores
    SET
      empresa = $1,
      cnpj = $2,
      telefone = $3,
      email = $4
    WHERE id = $5
    RETURNING *
    `,
    [
      empresa,
      cnpj,
      telefone,
      email,
      id
    ]
  );

  return result.rows[0];
}

async function excluir(id) {
  await pool.query(
    `
    DELETE FROM fornecedores
    WHERE id = $1
    `,
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