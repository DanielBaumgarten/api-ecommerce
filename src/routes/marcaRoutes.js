const express = require("express");

const router = express.Router();

const marcaController =
  require("../controllers/marcaController");

const authMiddleware =
  require("../middlewares/authMiddleware");

/**
 * @swagger
 * /marcas:
 *   get:
 *     summary: Lista todas as marcas
 *     tags: [Marcas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de marcas
 */
router.get(
  "/",
  authMiddleware,
  marcaController.listar
);

/**
 * @swagger
 * /marcas/{id}:
 *   get:
 *     summary: Busca marca por ID
 *     tags: [Marcas]
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
 *         description: Marca encontrada
 *       404:
 *         description: Marca não encontrada
 */
router.get(
  "/:id",
  authMiddleware,
  marcaController.buscarPorId
);

/**
 * @swagger
 * /marcas:
 *   post:
 *     summary: Cadastra uma marca
 *     tags: [Marcas]
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
 *               url_logo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Marca cadastrada
 */
router.post(
  "/",
  authMiddleware,
  marcaController.criar
);

/**
 * @swagger
 * /marcas/{id}:
 *   put:
 *     summary: Atualiza uma marca
 *     tags: [Marcas]
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
 *         description: Marca atualizada
 */
router.put(
  "/:id",
  authMiddleware,
  marcaController.atualizar
);

/**
 * @swagger
 * /marcas/{id}:
 *   delete:
 *     summary: Remove uma marca
 *     tags: [Marcas]
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
 *         description: Marca removida
 */
router.delete(
  "/:id",
  authMiddleware,
  marcaController.excluir
);

module.exports = router;