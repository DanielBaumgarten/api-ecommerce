const fornecedorService = require("../services/fornecedorService");

async function listar(req, res) {
  const fornecedores =
    await fornecedorService.listar();

  res.status(200).json(fornecedores);
}

async function buscarPorId(req, res) {
  const { id } = req.params;

  const fornecedor =
    await fornecedorService.buscarPorId(id);

  if (!fornecedor) {
    return res.status(404).json({
      mensagem: "Fornecedor não encontrado"
    });
  }

  res.status(200).json(fornecedor);
}

async function criar(req, res) {
  const {
    empresa,
    cnpj,
    telefone,
    email
  } = req.body;

  if (!empresa || !cnpj) {
    return res.status(400).json({
      mensagem:
        "Empresa e CNPJ são obrigatórios"
    });
  }

  const fornecedor =
    await fornecedorService.criar(
      empresa,
      cnpj,
      telefone,
      email
    );

  res.status(201).json(fornecedor);
}

async function atualizar(req, res) {
  const { id } = req.params;

  const {
    empresa,
    cnpj,
    telefone,
    email
  } = req.body;

  const fornecedor =
    await fornecedorService.atualizar(
      id,
      empresa,
      cnpj,
      telefone,
      email
    );

  if (!fornecedor) {
    return res.status(404).json({
      mensagem: "Fornecedor não encontrado"
    });
  }

  res.status(200).json(fornecedor);
}

async function excluir(req, res) {
  const { id } = req.params;

  await fornecedorService.excluir(id);

  res.status(204).send();
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir
};