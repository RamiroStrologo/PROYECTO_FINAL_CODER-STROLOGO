const { Router } = require('express');
const route = new Router();
const {
  recoveryPassword,
  changePass,
  delProdPremium,
  endPurchase,
} = require('../controllers/mailer.controllers');

route.post('/passrecovery', recoveryPassword);

route.post('/changepass', changePass);

route.post('/delPremiumProd', delProdPremium);

route.post('/endPurchase', endPurchase);

module.exports = route;
