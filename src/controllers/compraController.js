const compraService =
  require("../services/compraService");

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

module.exports = {
  criar
};