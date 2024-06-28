const { compraManager } = require('../db/factory');
const cm = new compraManager();

const finalizarCompra = async (req, res) => {
  try {
    let response = await cm.realizarCompra(req.body);
    if (response) {
      res.status(200).send({ msg: 'Compra realizada con exito' });
    } else {
      res.status(500).send({ msg: 'Error al realizar la compra' });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { finalizarCompra };
