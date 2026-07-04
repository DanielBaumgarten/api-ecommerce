const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const authRoutes = require("./routes/authRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const compraRoutes = require("./routes/compraRoutes");
const marcaRoutes = require("./routes/marcaRoutes");
const fornecedorRoutes = require("./routes/fornecedorRoutes");



const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.use("/categorias", categoriaRoutes);
app.use("/clientes", clienteRoutes);
app.use("/produtos", produtoRoutes);
app.use("/marcas", marcaRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/compras", compraRoutes);
app.use("/auth", authRoutes);
app.use("/fornecedores",fornecedorRoutes);



app.get("/perfil", authMiddleware, (req, res) => {
  res.json(req.usuario);
});

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Ecommerce funcionando"
  });
});

module.exports = app;