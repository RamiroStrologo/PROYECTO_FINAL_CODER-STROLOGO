const { Router } = require('express');
const route = new Router();
const {
  getUsers,
  deleteUser,
  changeRolUser,
  inactiveUsers,
} = require('../controllers/users.controller');

route.get('/', getUsers);

route.delete('/', deleteUser);

route.put('/change_rol', changeRolUser);

route.delete('/inactive_users', inactiveUsers);

module.exports = route;
