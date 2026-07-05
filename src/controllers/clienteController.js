const clienteService =
  require("../services/clienteService");

async function listar(
  req,
  res,
  next
) {
  try {
    const clientes =
      await clienteService.listar();

    res.status(200).json(clientes);

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

    const cliente =
      await clienteService.buscarPorId(id);

    if (!cliente) {
      const error = new Error(
        "Cliente não encontrado"
      );

      error.status = 404;

      throw error;
    }

    res.status(200).json(cliente);

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
      cpf,
      email,
      telefone,
      endereco
    } = req.body;

    if (!nome || !cpf || !email) {
      const error = new Error(
        "Nome, CPF e Email são obrigatórios"
      );

      error.status = 400;

      throw error;
    }

    const cliente =
      await clienteService.criar(
        nome,
        cpf,
        email,
        telefone,
        endereco
      );

    res.status(201).json(cliente);

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
      cpf,
      email,
      telefone,
      endereco
    } = req.body;

    const cliente =
      await clienteService.atualizar(
        id,
        nome,
        cpf,
        email,
        telefone,
        endereco
      );

    if (!cliente) {
      const error = new Error(
        "Cliente não encontrado"
      );

      error.status = 404;

      throw error;
    }

    res.status(200).json(cliente);

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

    await clienteService.excluir(id);

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