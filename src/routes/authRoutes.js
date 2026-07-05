const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastro de usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Daniel Baumgarten
 *               email:
 *                 type: string
 *                 example: daniel@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário cadastrado
 */
router.post(
  "/register",
  authController.cadastrar
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: daniel@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Token JWT gerado
 *       401:
 *         description: Credenciais inválidas
 */
router.post(
  "/login",
  authController.login
);

module.exports = router;