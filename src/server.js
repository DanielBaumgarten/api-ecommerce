const app = require("./app");
const pool = require("./db/connection");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log("Banco conectado!");
    console.log(result.rows[0]);

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
  }
}

startServer();