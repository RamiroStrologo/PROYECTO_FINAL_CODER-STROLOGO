const SessionDTO = require('../db/dto/session.dto');

const currentSession = async (req, res) => {
  const data = new SessionDTO(req.session.passport.user);
  res.send(data);
};

module.exports = { currentSession };
