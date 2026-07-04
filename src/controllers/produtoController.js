const produtoService =  require("../services/produtoService");

async function listar(req, res) {
  const produtos =
    await produtoService.listar();

  res.status(200).json(produtos);
}

async function buscarPorId(req, res) {
  const { id } = req.params;

  const produto =
    await produtoService.buscarPorId(id);

  if (!produto) {
    return res.status(404).json({
      mensagem: "Produto não encontrado"
    });
  }

  res.status(200).json(produto);
}

async function criar(req, res) {
  const {
    nome,
    preco,
    descricao,
    estoque,
    categoria_id,
    marca_id
  } = req.body;

  if (
    !nome ||
    !preco ||
    !categoria_id ||
    !marca_id
  ) {
    return res.status(400).json({
      mensagem:
        "Nome, preço, categoria e marca são obrigatórios"
    });
  }

  const produto =
    await produtoService.criar(
      nome,
      preco,
      descricao,
      estoque,
      categoria_id,
      marca_id
    );

  res.status(201).json(produto);
}

async function atualizar(req, res) {
  const { id } = req.params;

  const {
    nome,
    preco,
    descricao,
    estoque,
    categoria_id,
    marca_id
  } = req.body;

  const produto =
    await produtoService.atualizar(
      id,
      nome,
      preco,
      descricao,
      estoque,
      categoria_id,
      marca_id
    );

  res.status(200).json(produto);
}

async function excluir(req, res) {
  const { id } = req.params;

  await produtoService.excluir(id);

  res.status(204).send();
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir
};