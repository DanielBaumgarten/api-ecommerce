const pool = require("../db/connection");

async function listar() {
  const result = await pool.query(
    "SELECT * FROM clientes ORDER BY id"
  );

  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query(
    "SELECT * FROM clientes WHERE id = $1",
    [id]
  );

  return result.rows[0];
}

async function criar(nome, cpf, email, telefone, endereco) {
  const result = await pool.query(
    `
    INSERT INTO clientes (
      nome,
      cpf,
      email,
      telefone,
      endereco
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [nome, cpf, email, telefone, endereco]
  );

  return result.rows[0];
}

async function atualizar(
  id,
  nome,
  cpf,
  email,
  telefone,
  endereco
) {
  const result = await pool.query(
    `
    UPDATE clientes
    SET nome = $1,
        cpf = $2,
        email = $3,
        telefone = $4,
        endereco = $5
    WHERE id = $6
    RETURNING *
    `,
    [nome, cpf, email, telefone, endereco, id]
  );

  return result.rows[0];
}

async function excluir(id) {
  await pool.query(
    "DELETE FROM clientes WHERE id = $1",
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