const { userManager } = require('../db/factory');
const um = new userManager();

const getUsers = async (req, res) => {
  try {
    const users = await um.getUsers();
    if (users.length > 0) {
      let usersArray = [];
      users.forEach((e) => {
        const usrInfo = {
          name: e.name,
          email: e.email,
          rol: e.rol,
        };
        usersArray.push(usrInfo);
      });
      res.status(200).send(usersArray);
    } else res.status(404).send({ msg: 'Usuarios no encontrados' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Error en el servidor' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const email = req.body.email;
    const response = await um.deleteUser(email);
    response
      ? res.status(204).send({ msg: 'Usuario eliminado', data: true })
      : res.status(404).send({ msg: 'Usuario no encontrado', data: false });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Error en el servidor', data: false });
  }
};

const changeRolUser = async (req, res) => {
  try {
    const { email, newRol } = req.body;
    const response = await um.changeRolUser(email, newRol);
    response > 0
      ? res.status(200).send({ msg: 'Rol de usuario modificado', data: true })
      : res.status(404).send({ msg: 'No se encontró el usuario' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Error en el servidor' });
  }
};

const inactiveUsers = async (req, res) => {
  try {
    const response = await um.deleteInactiveUsers();
    response > 0
      ? res.status(204).send({ msg: 'Usuarios eliminador', data: response })
      : res
          .status(404)
          .send({ msg: 'No se encontraron usuarios para eliminar', data: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Error en el servidor', data: false });
  }
};

module.exports = { getUsers, deleteUser, changeRolUser, inactiveUsers };
