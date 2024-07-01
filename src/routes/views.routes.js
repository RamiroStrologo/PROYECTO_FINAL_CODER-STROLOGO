const { Router } = require('express');
const route = new Router();
const {
  authorizeUserForRoute,
  authorizeAdminForRoute,
  authorizeAdminAndPremiumForRoute,
} = require('../middleware/auth.middleware');
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
route.get('/cart', authorizeUserForRoute, cart);

route.get('/managerProds', authorizeAdminAndPremiumForRoute, productManager);
route.get('/userManager', authorizeAdminForRoute, usersManager);

route.get('/passrecovery', passRecovery);

module.exports = route;
