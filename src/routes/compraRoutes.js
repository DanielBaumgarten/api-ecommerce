const express = require("express");

const router = express.Router();

const compraController =
  require("../controllers/compraController");

const authMiddleware =
  require("../middlewares/authMiddleware");

router.post(
  "/",
  authMiddleware,
  compraController.criar
);

router.get(
  "/",
  authMiddleware,
  compraController.listar
);

router.get(
  "/:id",
  authMiddleware,
  compraController.buscarPorId
);

module.exports = router;