const CartManager = require('./mongo/cartManagerMongo');
const ProductManager = require('./mongo/productManagerMongo');
const UserManager = require('./mongo/userManagerMongo');
const CompraManager = require('./mongo/compraManagerMongo');
const CartManagerFS = require('./fs/cartManagerFS');
const ProductManagerFS = require('./fs/productsManagerFS');
const UserManagerFS = require('./fs/userManagerFS');
const CompraManagerFS = require('./fs/compraManagerFS');
const FakerManager = require('./fs/fakerManagerFS');
const varConfig = require('../config/envVarConfig');
let cartManager;
let productManager;
let userManager;
let compraManager;
let fakerManager;

switch (varConfig.persistence) {
  case 'MONGO':
    cartManager = CartManager;
    productManager = ProductManager;
    userManager = UserManager;
    compraManager = CompraManager;
    fakerManager = FakerManager;
    break;
  case 'FILE':
    cartManager = CartManagerFS;
    productManager = ProductManagerFS;
    userManager = UserManagerFS;
    compraManager = CompraManagerFS;
    fakerManager = FakerManager;
    break;
}

module.exports = {
  cartManager,
  productManager,
  userManager,
  compraManager,
  fakerManager,
};
