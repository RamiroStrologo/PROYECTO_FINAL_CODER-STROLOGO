const { Router } = require('express');
const route = new Router();
const {
  recoveryPassword,
  changePass,
} = require('../controllers/mailer.controllers');

route.post('/passrecovery', recoveryPassword);

route.post('/changepass', changePass);

module.exports = route;
