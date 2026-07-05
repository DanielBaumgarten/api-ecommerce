const authService = require("../services/authService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function cadastrar(
  req,
  res,
  next
) {
  try {
    const {
      nome,
      email,
      senha
    } = req.body;

    if (!nome || !email || !senha) {
      const error = new Error(
        "Todos os campos são obrigatórios"
      );

      error.status = 400;

      throw error;
    }

    const usuarioExistente =
      await authService.buscarPorEmail(
        email
      );

    if (usuarioExistente) {
      const error = new Error(
        "E-mail já cadastrado"
      );

      error.status = 400;

      throw error;
    }

    const usuario =
      await authService.cadastrar(
        nome,
        email,
        senha
      );

    res.status(201).json(usuario);

  } catch (error) {
    next(error);
  }
}

async function login(
  req,
  res,
  next
) {
  try {
    const {
      email,
      senha
    } = req.body;

    if (!email || !senha) {
      const error = new Error(
        "Email e senha são obrigatórios"
      );

      error.status = 400;

      throw error;
    }

    const usuario =
      await authService.buscarPorEmail(
        email
      );

    if (!usuario) {
      const error = new Error(
        "Credenciais inválidas"
      );

      error.status = 401;

      throw error;
    }

    const senhaValida =
      await bcrypt.compare(
        senha,
        usuario.senha
      );

    if (!senhaValida) {
      const error = new Error(
        "Credenciais inválidas"
      );

      error.status = 401;

      throw error;
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      token
    });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  cadastrar,
  login
};