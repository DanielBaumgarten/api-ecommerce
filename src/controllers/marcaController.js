const marcaService =
  require("../services/marcaService");

async function listar(req, res) {
  const marcas =
    await marcaService.listar();

  res.status(200).json(marcas);
}

async function buscarPorId(req, res) {
  const { id } = req.params;

  const marca =
    await marcaService.buscarPorId(id);

  if (!marca) {
    return res.status(404).json({
      mensagem: "Marca não encontrada"
    });
  }

  res.status(200).json(marca);
}

async function criar(req, res) {
  const { nome, url_logo } = req.body;

  if (!nome) {
    return res.status(400).json({
      mensagem: "Nome é obrigatório"
    });
  }

  const marca =
    await marcaService.criar(
      nome,
      url_logo
    );

  res.status(201).json(marca);
}

async function atualizar(req, res) {
  const { id } = req.params;

  const { nome, url_logo } = req.body;

  const marca =
    await marcaService.atualizar(
      id,
      nome,
      url_logo
    );

  res.status(200).json(marca);
}

async function excluir(req, res) {
  const { id } = req.params;

  await marcaService.excluir(id);

  res.status(204).send();
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir
};