const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController");
const authMiddleware =  require("../middlewares/authMiddleware");

router.post(
  "/",
  authMiddleware,
  pedidoController.criar
);

router.get(
  "/",
  authMiddleware,
  pedidoController.listar
);

router.get(
  "/:id",
  authMiddleware,
  pedidoController.buscarPorId
);

module.exports = router;