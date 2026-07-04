const compraService = require("../services/compraService");

async function criar(req, res) {
  try {
    const compra =
      await compraService.criar(req.body);

    res.status(201).json(compra);
  } catch (error) {
    res.status(400).json({
      mensagem: error.message
    });
  }
}

async function listar(req, res) {
  const compras =
    await compraService.listar();

  res.status(200).json(compras);
}

async function buscarPorId(req, res) {
  const { id } = req.params;

  const compra =
    await compraService.buscarPorId(id);

  if (!compra) {
    return res.status(404).json({
      mensagem: "Compra não encontrada"
    });
  }

  res.status(200).json(compra);
}

module.exports = {
criar,  
listar,
buscarPorId
};