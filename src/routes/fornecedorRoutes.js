const express = require("express");
const router = express.Router();
const fornecedorController = require("../controllers/fornecedorController");

const authMiddleware =
  require("../middlewares/authMiddleware");

router.get(
  "/",
  authMiddleware,
  fornecedorController.listar
);

router.get(
  "/:id",
  authMiddleware,
  fornecedorController.buscarPorId
);

router.post(
  "/",
  authMiddleware,
  fornecedorController.criar
);

router.put(
  "/:id",
  authMiddleware,
  fornecedorController.atualizar
);

router.delete(
  "/:id",
  authMiddleware,
  fornecedorController.excluir
);

module.exports = router;