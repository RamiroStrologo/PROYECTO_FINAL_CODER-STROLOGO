const { Router } = require('express');
const route = new Router();
const passport = require('passport');
const { register, login, logout } = require('../controllers/auth.controllers');

route.post('/register', passport.authenticate('register'), register);

route.post('/login', passport.authenticate('login'), login);

route.get('/logout', logout);

module.exports = route;
