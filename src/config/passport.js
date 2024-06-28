const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { userManager } = require('../db/factory');
const um = new userManager();

const initializePassport = () => {
  passport.use(
    'register',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const response = await um.registerUser(req.body);
          console.log(response);
          if (!response) {
            return done(null, false, { message: 'Error, usuario ya existe' });
          }
          return done(null, response);
        } catch (err) {
          return done('Error al crear el usuario - passport', err);
        }
      }
    )
  );
  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const response = await um.loginUser(req.body);
          if (!response) {
            return done(null, false, {
              message: 'Error, usuario y/o contraseña incorrectos',
            });
          }
          return done(null, response);
        } catch (err) {
          return done('Error al iniciar sesión', err);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  const userLogged = {
    id: user.id,
    username: user.name + ' ' + user.lastname,
    email: user.email,
    cartId: user.cart,
    rol: user.rol,
  };

  done(null, userLogged);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = { initializePassport };
