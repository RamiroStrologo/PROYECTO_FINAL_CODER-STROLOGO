const { Router } = require('express');
const route = new Router();
const { finalizarCompra } = require('../controllers/compras.controllers');

route.post('/finalizarcompra', finalizarCompra);

module.exports = route;
