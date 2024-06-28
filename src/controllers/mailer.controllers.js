const { transporter } = require('../utils/mailing');
const varConfig = require('../config/envVarConfig');
const { userManager } = require('../db/factory');
um = new userManager();

const recoveryPassword = async (req, res) => {
  try {
    const response = await um.findUser(req.body.email);
    if (!response) {
      res.send({ msg: 'El email no existe en la base de datos' });
      return false;
    }
    await transporter.sendMail({
      from: '<ramirostrologo@gmail.com>',
      to: req.body.email,
      subject: 'hola',
      text: `http://localhost:${varConfig.port}/views/passrecovery`,
    });
    res.send({ msg: 'Correo enviado' });
  } catch (err) {
    console.error(err);
  }
};

const changePass = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await um.changePass(email, password);
    response
      ? res.send({ msg: 'La contrasenia fue modificada con exito' })
      : res.send({
          msg: 'La nueva contrasenia no puede ser la que te olvidaste xd',
        });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { recoveryPassword, changePass };
