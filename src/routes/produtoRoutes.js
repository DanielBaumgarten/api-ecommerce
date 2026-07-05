const express = require("express");

const router = express.Router();

const produtoController =
  require("../controllers/produtoController");

const authMiddleware =
  require("../middlewares/authMiddleware");

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get(
  "/",
  authMiddleware,
  produtoController.listar
);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Busca produto por ID
 *     tags: [Produtos]
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
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get(
  "/:id",
  authMiddleware,
  produtoController.buscarPorId
);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cadastra um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *               estoque:
 *                 type: integer
 *               categoria_id:
 *                 type: integer
 *               marca_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produto cadastrado
 */
router.post(
  "/",
  authMiddleware,
  produtoController.criar
);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
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
 *         description: Produto atualizado
 */
router.put(
  "/:id",
  authMiddleware,
  produtoController.atualizar
);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Exclui um produto
 *     tags: [Produtos]
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
 *         description: Produto removido
 */
router.delete(
  "/:id",
  authMiddleware,
  produtoController.excluir
);

module.exports = router;