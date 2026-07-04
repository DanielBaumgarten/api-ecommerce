const authService = require("../services/authService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function cadastrar(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios"
    });
  }

  const usuarioExistente =
    await authService.buscarPorEmail(email);

  if (usuarioExistente) {
    return res.status(400).json({
      mensagem: "E-mail já cadastrado"
    });
  }

  const usuario = await authService.cadastrar(
    nome,
    email,
    senha
  );

  res.status(201).json(usuario);
}

async function login(req, res) {
  console.log("Body recebido:", req.body);

  if (!req.body) {
    return res.status(400).json({
      mensagem: "Body da requisição não enviado"
    });
  }

  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      mensagem: "Email e senha são obrigatórios"
    });
  }

  const usuario =
    await authService.buscarPorEmail(email);

  if (!usuario) {
    return res.status(401).json({
      mensagem: "Credenciais inválidas"
    });
  }

  const senhaValida =
    await bcrypt.compare(
      senha,
      usuario.senha
    );

  if (!senhaValida) {
    return res.status(401).json({
      mensagem: "Credenciais inválidas"
    });
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
}

module.exports = {
  cadastrar,
  login
};