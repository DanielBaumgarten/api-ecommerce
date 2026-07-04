const pool = require("../db/connection");
const bcrypt = require("bcrypt");

async function cadastrar(nome, email, senha) {
  const senhaHash = await bcrypt.hash(senha, 10);

  const result = await pool.query(
    `
    INSERT INTO usuarios (
      nome,
      email,
      senha
    )
    VALUES ($1, $2, $3)
    RETURNING id, nome, email
    `,
    [nome, email, senhaHash]
  );

  return result.rows[0];
}

async function buscarPorEmail(email) {
  const result = await pool.query(
    `
    SELECT *
    FROM usuarios
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0];
}

module.exports = {
  cadastrar,
  buscarPorEmail
};