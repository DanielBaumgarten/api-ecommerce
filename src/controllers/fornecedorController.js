const fornecedorService = require("../services/fornecedorService");

async function listar(
  req,
  res,
  next
) {
  try {
    const fornecedores =
      await fornecedorService.listar();

    res.status(200).json(fornecedores);

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

    const fornecedor =
      await fornecedorService.buscarPorId(id);

    if (!fornecedor) {
      const error = new Error(
        "Fornecedor não encontrado"
      );

      error.status = 404;

      throw error;
    }

    res.status(200).json(fornecedor);

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
      empresa,
      cnpj,
      telefone,
      email
    } = req.body;

    if (!empresa || !cnpj) {
      const error = new Error(
        "Empresa e CNPJ são obrigatórios"
      );

      error.status = 400;

      throw error;
    }

    const fornecedor =
      await fornecedorService.criar(
        empresa,
        cnpj,
        telefone,
        email
      );

    res.status(201).json(fornecedor);

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
      const error = new Error(
        "Fornecedor não encontrado"
      );

      error.status = 404;

      throw error;
    }

    res.status(200).json(fornecedor);

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

    await fornecedorService.excluir(id);

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