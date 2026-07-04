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

module.exports = {
  criar
};