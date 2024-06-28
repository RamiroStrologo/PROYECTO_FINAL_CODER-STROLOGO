const { Router } = require('express');
const route = new Router();
const { errorHandler } = require('../middleware/error.middleware');
const {
  getProducts,
  addProd,
  delProd,
} = require('../controllers/products.controller');

route.get('/', getProducts);
route.post('/addProd', addProd);
route.delete('/delProd', delProd);

route.use(errorHandler);

module.exports = route;
