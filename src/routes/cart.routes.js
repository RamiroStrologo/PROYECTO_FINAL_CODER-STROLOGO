const { Router } = require('express');
const route = new Router();
const { authorizeUserForRoute } = require('../middleware/auth.middleware');

const {
  newCart,
  getCartProducts,
  addProdToCart,
  delProdById,
  delAll,
} = require('../controllers/cart.controllers');

//CREA UN CARRITO
route.post('/newCart', newCart);
//OBTIENE LOS PRODUCTOS DE UN CARRITO
route.get('/:cid', getCartProducts);

//AGREGA PRODUCTOS AL CARRITO
route.put('/addProdToCart/:cId/:pId', authorizeUserForRoute, addProdToCart);

//ELIMINA UN PRODUCTO DEL CARRITO POR SU ID
route.delete('/:cid/products/:pid', delProdById);

//ELIMINA TODO EL CARRITO
route.put('/delAll/:cid', delAll);

module.exports = route;
