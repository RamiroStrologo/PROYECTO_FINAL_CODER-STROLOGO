const { cartManager } = require('../db/factory');
const cm = new cartManager();

const newCart = async (req, res) => {
  try {
    const cartId = await cm.addCart();
    res.status(200).send({ data: cartId });
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getCartProducts = async (req, res) => {
  try {
    let cid = req.params.cid;
    let response = await cm.getCartById(cid);
    if (response) {
      res.status(200).send({
        msg: `Carrito encontrado con éxito`,
        data: response,
      });
    } else {
      res.status(404).send({
        msg: `Carrito no encontrado`,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const addProdToCart = async (req, res) => {
  try {
    let cId = req.params.cId;
    let pId = req.params.pId;
    let response = await cm.addProdToCart(cId, pId);
    if (response) {
      res.status(201).send({
        msg: `Producto agregado con éxito al carrito`,
      });
    } else {
      res.status(404).send({
        msg: `Carrito ${cId} no encontrado`,
      });
    }
  } catch (err) {
    console.error(err);
  }
};
const delProdById = async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let response = await cm.delProdById(cid, pid);
    if (response) {
      res.status(200).send({
        msg: `Producto eliminado con éxito`,
      });
    } else {
      res.status(404).send({
        msg: `Carrito ${cid} no encontrado o producto no existe`,
      });
    }
  } catch (err) {
    console.error(err);
  }
};
const delAll = async (req, res) => {
  try {
    const id = req.params.cid;
    const response = await cm.deleteAll(id);
    if (response) {
      res.status(200).send({ msg: 'Productos eliminados' });
    } else {
      res.status(500).send({ msg: 'Error al eliminar los productos' });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  newCart,
  getCartProducts,
  addProdToCart,
  delProdById,
  delAll,
};
