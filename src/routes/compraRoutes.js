const express = require("express");
const router = express.Router();
const compraController = require("../controllers/compraController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /compras:
 *   get:
 *     summary: Lista todas as compras
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de compras
 */
router.get(
  "/",
  authMiddleware,
  compraController.listar
);

/**
 * @swagger
 * /compras/{id}:
 *   get:
 *     summary: Busca uma compra por ID
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Compra encontrada
 *       404:
 *         description: Compra não encontrada
 */
router.get(
  "/:id",
  authMiddleware,
  compraController.buscarPorId
);

/**
 * @swagger
 * /compras:
 *   post:
 *     summary: Cadastra uma nova compra
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fornecedorId:
 *                 type: integer
 *                 example: 1
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-05"
 *               valorTotal:
 *                 type: number
 *                 format: float
 *                 example: 1500.75
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produtoId:
 *                       type: integer
 *                       example: 1
 *                     quantidade:
 *                       type: integer
 *                       example: 10
 *                     valorUnitario:
 *                       type: number
 *                       format: float
 *                       example: 150.07
 *     responses:
 *       201:
 *         description: Compra cadastrada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post(
  "/",
  authMiddleware,
  compraController.criar
);

module.exports = router;