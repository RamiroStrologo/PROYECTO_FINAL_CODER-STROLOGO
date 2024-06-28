const { Router } = require('express');
const route = new Router();
const { authorizeAdminForRoute } = require('../middleware/auth.middleware');
const {
  login,
  logup,
  products,
  cart,
  productManager,
  usersManager,
  passRecovery,
} = require('../controllers/views.controllers');

route.get('/login', login);

route.get('/logup', logup);

route.get('/products', products);
route.get('/cart', cart);

route.get('/managerProds', authorizeAdminForRoute, productManager);
route.get('/userManager', authorizeAdminForRoute, usersManager);

route.get('/passrecovery', passRecovery);

module.exports = route;
