const express = require("express");

const router = express.Router();

const produtoController =
  require("../controllers/produtoController");

const authMiddleware =
  require("../middlewares/authMiddleware");

router.get(
  "/",
  authMiddleware,
  produtoController.listar
);

router.get(
  "/:id",
  authMiddleware,
  produtoController.buscarPorId
);

router.post(
  "/",
  authMiddleware,
  produtoController.criar
);

router.put(
  "/:id",
  authMiddleware,
  produtoController.atualizar
);

router.delete(
  "/:id",
  authMiddleware,
  produtoController.excluir
);

module.exports = router;