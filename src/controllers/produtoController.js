const produtoService = require("../services/produtoService");

async function listar(
  req,
  res,
  next
) {
  try {
    const produtos =
      await produtoService.listar();

    res.status(200).json(produtos);

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

    const produto =
      await produtoService.buscarPorId(id);

    if (!produto) {
      const error = new Error(
        "Produto não encontrado"
      );

      error.status = 404;

      throw error;
    }

    res.status(200).json(produto);

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
      const error = new Error(
        "Nome, preço, categoria e marca são obrigatórios"
      );

      error.status = 400;

      throw error;
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

    if (!produto) {
      const error = new Error(
        "Produto não encontrado"
      );

      error.status = 404;

      throw error;
    }

    res.status(200).json(produto);

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

    await produtoService.excluir(id);

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