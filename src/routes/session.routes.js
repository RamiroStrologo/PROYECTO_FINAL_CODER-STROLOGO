const { Router } = require('express');
const route = new Router();
const { currentSession } = require('../controllers/session.controllers');

// PASAR LOS DATOS DEL USUARIO LOGUEADO AL FRONT
route.get('/current', currentSession);

module.exports = route;
