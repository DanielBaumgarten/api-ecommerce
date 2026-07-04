const pedidoService =
  require("../services/pedidoService");

async function criar(req, res) {
  try {
    const pedido =
      await pedidoService.criar(req.body);

    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({
      mensagem: error.message
    });
  }
}

async function listar(req, res) {
  const pedidos =
    await pedidoService.listar();

  res.status(200).json(pedidos);
}

async function buscarPorId(req, res) {
  const { id } = req.params;
  const pedido =
    await pedidoService.buscarPorId(id);

  if (!pedido) {
    return res.status(404).json({
      mensagem: "Pedido não encontrado"
    });
  }
  res.status(200).json(pedido);
}

module.exports = {
  criar,
  listar,
  buscarPorId
};