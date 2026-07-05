const pedidoService = require("../services/pedidoService");

async function criar(
  req,
  res,
  next
) {
  try {
    const pedido =
      await pedidoService.criar(
        req.body
      );

    res.status(201).json(pedido);

  } catch (error) {
    next(error);
  }
}

async function listar(
  req,
  res,
  next
) {
  try {
    const pedidos =
      await pedidoService.listar();

    res.status(200).json(pedidos);

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

    const pedido =
      await pedidoService.buscarPorId(
        id
      );

    if (!pedido) {
      const error = new Error(
        "Pedido não encontrado"
      );

      error.status = 404;

      throw error;
    }

    res.status(200).json(pedido);

  } catch (error) {
    next(error);
  }
}

module.exports = {
  criar,
  listar,
  buscarPorId
};