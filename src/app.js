const express = require("express");
const cors = require("cors");

const categoriaRoutes = require("./routes/categoriaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categorias", categoriaRoutes);

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Ecommerce funcionando"
  });
});

module.exports = app;