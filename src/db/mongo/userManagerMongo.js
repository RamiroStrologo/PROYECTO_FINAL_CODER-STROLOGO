const User = require('./models/user.model');
const { createHash, isValid } = require('../../utils/bcrypts');
const varConfig = require('../../config/envVarConfig');

class UserMananger {
  constructor() {
    this.users = [];
  }
  async registerUser(userData) {
    try {
      const exist = await this.findUser(userData.email);
      if (!exist) {
        const response = await fetch(
          `http://localhost:${varConfig.port}/api/cart/newCart`,
          {
            method: 'POST',
          }
        );
        const cartId = await response.json();
        if (!response.ok) throw new Error('Failed to create cart');
        userData.cart = cartId.data._id;
        userData.password = createHash(userData.password);
        userData.rol = 'user';
        const register = await User.create(userData);
        return register ? true : false;
      } else return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async changePass(email, password) {
    try {
      const usr = await this.findUser(email);
      const validPassword = isValid(password, usr.password);
      console.log('en manager', validPassword);
      if (validPassword) return false;
      const newPass = createHash(password);
      const res = await User.updateOne(
        { email: email },
        { $set: { password: newPass } }
      );
      return res ? true : false;
    } catch (err) {
      console.error(err);
    }
  }

  async loginUser(userData) {
    try {
      const users = await User.find({ email: `${userData.email}` });
      if (users.length > 0) {
        const validPassword = isValid(userData.password, users[0].password);
        if (validPassword) {
          await User.updateOne(
            { email: userData.email },
            { lastLogin: new Date() }
          );
          return users[0];
        } else return false;
      } else return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async findUser(email) {
    try {
      this.users = await User.find();
      const userFound = this.users.find((e) => {
        return e.email === email;
      });
      if (userFound) return userFound;
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getUsers() {
    try {
      this.users = await User.find();
      return this.users;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async deleteUser(email) {
    try {
      const usrDeleted = await User.deleteOne({ email: email });
      if (usrDeleted.deletedCount === 1) return true;
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async changeRolUser(email, rol) {
    try {
      const result = await User.updateOne({ email: email }, { rol: rol });
      console.log(result);
      if (result.modifiedCount > 0) return true;
      else return 0;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async deleteInactiveUsers() {
    const thirtyMinutesAgo = new Date();
    thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 1);
    try {
      const result = await User.deleteMany({
        lastLogin: { $lt: thirtyMinutesAgo },
        rol: { $ne: 'admin' },
      });
      if (result.deletedCount > 0) {
        return result.deletedCount;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Error deleting inactive users:', err);
      return false;
    }
  }
}

module.exports = UserMananger;
