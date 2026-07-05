const express = require("express");
const router = express.Router();
const fornecedorController = require("../controllers/fornecedorController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /fornecedores:
 *   get:
 *     summary: Lista todos os fornecedores
 *     tags: [Fornecedores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de fornecedores
 */
router.get(
  "/",
  authMiddleware,
  fornecedorController.listar
);

/**
 * @swagger
 * /fornecedores/{id}:
 *   get:
 *     summary: Busca fornecedor por ID
 *     tags: [Fornecedores]
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
 *         description: Fornecedor encontrado
 *       404:
 *         description: Fornecedor não encontrado
 */
router.get(
  "/:id",
  authMiddleware,
  fornecedorController.buscarPorId
);

/**
 * @swagger
 * /fornecedores:
 *   post:
 *     summary: Cadastra um fornecedor
 *     tags: [Fornecedores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empresa:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fornecedor cadastrado
 */
router.post(
  "/",
  authMiddleware,
  fornecedorController.criar
);

/**
 * @swagger
 * /fornecedores/{id}:
 *   put:
 *     summary: Atualiza um fornecedor
 *     tags: [Fornecedores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Fornecedor atualizado
 */
router.put(
  "/:id",
  authMiddleware,
  fornecedorController.atualizar
);

/**
 * @swagger
 * /fornecedores/{id}:
 *   delete:
 *     summary: Remove um fornecedor
 *     tags: [Fornecedores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Fornecedor removido
 */
router.delete(
  "/:id",
  authMiddleware,
  fornecedorController.excluir
);

module.exports = router;