const clienteService = require("../services/clienteService");

async function listar(req, res) {
  const clientes = await clienteService.listar();

  res.status(200).json(clientes);
}

async function buscarPorId(req, res) {
  const { id } = req.params;

  const cliente = await clienteService.buscarPorId(id);

  if (!cliente) {
    return res.status(404).json({
      mensagem: "Cliente não encontrado"
    });
  }

  res.status(200).json(cliente);
}

async function criar(req, res) {
  const {
    nome,
    cpf,
    email,
    telefone,
    endereco
  } = req.body;

  if (!nome || !cpf || !email) {
    return res.status(400).json({
      mensagem:
        "Nome, CPF e Email são obrigatórios"
    });
  }

  const cliente = await clienteService.criar(
    nome,
    cpf,
    email,
    telefone,
    endereco
  );

  res.status(201).json(cliente);
}

async function atualizar(req, res) {
  const { id } = req.params;

  const {
    nome,
    cpf,
    email,
    telefone,
    endereco
  } = req.body;

  const cliente = await clienteService.atualizar(
    id,
    nome,
    cpf,
    email,
    telefone,
    endereco
  );

  res.status(200).json(cliente);
}

async function excluir(req, res) {
  const { id } = req.params;

  await clienteService.excluir(id);

  res.status(204).send();
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir
};