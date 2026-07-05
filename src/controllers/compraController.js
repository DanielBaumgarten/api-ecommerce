const compraService = require("../services/compraService");

async function criar(
  req,
  res,
  next
) {
  try {
    const compra =
      await compraService.criar(
        req.body
      );

    res.status(201).json(compra);

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
    const compras =
      await compraService.listar();

    res.status(200).json(compras);

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

    const compra =
      await compraService.buscarPorId(
        id
      );

    if (!compra) {
      const error = new Error(
        "Compra não encontrada"
      );

      error.status = 404;

      throw error;
    }

    res.status(200).json(compra);

  } catch (error) {
    next(error);
  }
}

module.exports = {
  criar,
  listar,
  buscarPorId
};
