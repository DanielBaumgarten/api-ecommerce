const express = require("express");
const cors = require("cors");

const categoriaRoutes = require("./routes/categoriaRoutes");
const clienteRoutes = require("./routes/clienteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categorias", categoriaRoutes);
app.use("/clientes", clienteRoutes);

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Ecommerce funcionando"
  });
});

module.exports = app;