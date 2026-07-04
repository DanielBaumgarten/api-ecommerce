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

module.exports = router;