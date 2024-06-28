const { Router } = require('express');
const route = new Router();
const { authorizeAdminForRoute } = require('../middleware/auth.middleware');
const { fakerManager } = require('../db/factory');
const fm = new fakerManager();

route.post('/generateProds', async (req, res) => {
  try {
    await fm.generateProductsFaker();
    res.send({ msg: 'Productos faker agregados con éxito' });
  } catch (err) {
    console.error(err);
    res.send({ msg: 'No se pudieron agregar los productos' });
  }
});

module.exports = route;
