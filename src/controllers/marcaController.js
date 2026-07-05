const marcaService = require("../services/marcaService");

async function listar(
  req,
  res,
  next
) {
  try {
    const marcas =
      await marcaService.listar();

    res.status(200).json(marcas);

  } catch (error) {
    next(error);
  }
}

async function buscarPorId(
  req,
  res,
  next
) {
  try {
    const { id } = req.params;

    const marca =
      await marcaService.buscarPorId(id);

    if (!marca) {
      const error = new Error(
        "Marca não encontrada"
      );

      error.status = 404;

      throw error;
    }

    res.status(200).json(marca);

  } catch (error) {
    next(error);
  }
}

async function criar(
  req,
  res,
  next
) {
  try {
    const { nome, url_logo } = req.body;

    if (!nome) {
      const error = new Error(
        "Nome é obrigatório"
      );

      error.status = 400;

      throw error;
    }

    const marca =
      await marcaService.criar(
        nome,
        url_logo
      );

    res.status(201).json(marca);

  } catch (error) {
    next(error);
  }
}

async function atualizar(
  req,
  res,
  next
) {
  try {
    const { id } = req.params;

    const { nome, url_logo } = req.body;

    const marca =
      await marcaService.atualizar(
        id,
        nome,
        url_logo
      );

    if (!marca) {
      const error = new Error(
        "Marca não encontrada"
      );

      error.status = 404;

      throw error;
    }

    res.status(200).json(marca);

  } catch (error) {
    next(error);
  }
}

async function excluir(
  req,
  res,
  next
) {
  try {
    const { id } = req.params;

    await marcaService.excluir(id);

    res.status(204).send();

  } catch (error) {
    next(error);
  }
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir
};