const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const compraRoutes = require("./routes/compraRoutes");


const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/clientes", clienteRoutes);
app.use("/compras", compraRoutes);
app.use("/produtos", produtoRoutes);
app.use("/pedidos", pedidoRoutes);

app.get("/perfil", authMiddleware, (req, res) => {
  res.json(req.usuario);
});

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Ecommerce funcionando"
  });
});

module.exports = app;