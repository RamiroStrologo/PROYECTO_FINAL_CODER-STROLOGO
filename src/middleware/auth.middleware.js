const authorizeUserForRoute = async (req, res, next) => {
  try {
    const data = req.session.passport.user;
    return data.rol != 'admin'
      ? next()
      : res.status(401).send({
          msg: 'No tienes permiso para realizar esta acción',
          data: false,
        });
  } catch (err) {
    console.error(err);
  }
};

const authorizeAdminForRoute = async (req, res, next) => {
  try {
    const data = req.session.passport.user;
    return data.rol == 'admin'
      ? next()
      : res.status(401).send({
          msg: 'No tienes permiso para realizar esta acción',
          data: false,
        });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { authorizeUserForRoute, authorizeAdminForRoute };
