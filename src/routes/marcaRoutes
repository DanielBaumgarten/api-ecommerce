const express = require("express");

const router = express.Router();

const marcaController =
  require("../controllers/marcaController");

const authMiddleware =
  require("../middlewares/authMiddleware");

router.get(
  "/",
  authMiddleware,
  marcaController.listar
);

router.get(
  "/:id",
  authMiddleware,
  marcaController.buscarPorId
);

router.post(
  "/",
  authMiddleware,
  marcaController.criar
);

router.put(
  "/:id",
  authMiddleware,
  marcaController.atualizar
);

router.delete(
  "/:id",
  authMiddleware,
  marcaController.excluir
);

module.exports = router;