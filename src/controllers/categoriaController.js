const categoriaService = require("../services/categoriaService");

async function listar(req, res) {
  const categorias = await categoriaService.listar();

  res.status(200).json(categorias);
}

async function buscarPorId(req, res) {
  const { id } = req.params;

  const categoria = await categoriaService.buscarPorId(id);

  if (!categoria) {
    return res.status(404).json({
      mensagem: "Categoria não encontrada"
    });
  }

  res.status(200).json(categoria);
}

async function criar(req, res) {
  const { nome, descricao } = req.body;

  if (!nome) {
    return res.status(400).json({
      mensagem: "Nome é obrigatório"
    });
  }

  const categoria = await categoriaService.criar(
    nome,
    descricao
  );

  res.status(201).json(categoria);
}

async function atualizar(req, res) {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  if (!nome) {
    return res.status(400).json({
      mensagem: "Nome é obrigatório"
    });
  }

  const categoria = await categoriaService.atualizar(
    id,
    nome,
    descricao
  );

  res.status(200).json(categoria);
}

async function excluir(req, res) {
  const { id } = req.params;

  await categoriaService.excluir(id);

  res.status(204).send();
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir
};