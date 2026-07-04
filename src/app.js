const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const produtoRoutes = require("./routes/produtoRoutes");

const app = express();


const authMiddleware =  require("./middlewares/authMiddleware");

app.get(
  "/perfil",
  authMiddleware,
  (req, res) => {
    res.json(req.usuario);
  }
);


app.use(cors());
app.use(express.json());

app.use("/categorias", categoriaRoutes);
app.use("/clientes", clienteRoutes);
app.use("/produtos", produtoRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Ecommerce funcionando"
  });
});

module.exports = app;