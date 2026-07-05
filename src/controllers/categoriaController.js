const categoriaService = require("../services/categoriaService");

async function listar(
  req,
  res,
  next
) {
  try {
    const categorias =
      await categoriaService.listar();

    res.status(200).json(categorias);

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

    const categoria =
      await categoriaService.buscarPorId(id);

    if (!categoria) {
      const error = new Error(
        "Categoria não encontrada"
      );

      error.status = 404;

      throw error;
    }

    res.status(200).json(categoria);

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
    const {
      nome,
      descricao
    } = req.body;

    if (!nome) {
      const error = new Error(
        "Nome é obrigatório"
      );

      error.status = 400;

      throw error;
    }

    const categoria =
      await categoriaService.criar(
        nome,
        descricao
      );

    res.status(201).json(categoria);

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

    const {
      nome,
      descricao
    } = req.body;

    if (!nome) {
      const error = new Error(
        "Nome é obrigatório"
      );

      error.status = 400;

      throw error;
    }

    const categoria =
      await categoriaService.atualizar(
        id,
        nome,
        descricao
      );

    res.status(200).json(categoria);

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

    await categoriaService.excluir(id);

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