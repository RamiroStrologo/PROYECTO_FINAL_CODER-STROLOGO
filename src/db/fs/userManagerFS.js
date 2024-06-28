const fs = require('fs/promises');
const { createHash, isValid } = require('../../utils/bcrypts');
const varConfig = require('../../config/envVarConfig');

class UserManager {
  constructor() {
    this.users = {};
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
        if (!response.ok) return false;

        console.log('ACA LLEGA');
        const cartId = await response.json();
        console.log('ACA NO');
        userData.cart = cartId.data._id;
        userData.password = createHash(userData.password);
        this.users.push(userData);
        await this.saveUsersToFile();
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async loginUser(userData) {
    try {
      await this.loadUsersFromFile();
      const user = this.users.find((user) => user.email === userData.email);
      if (user) {
        const validPassword = isValid(userData.password, user.password);
        if (validPassword) {
          return user;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async findUser(email) {
    try {
      await this.loadUsersFromFile();
      const userFound = this.users.find((user) => user.email === email);
      return userFound || false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async loadUsersFromFile() {
    try {
      const usersData = await fs.readFile(
        `${__dirname}/json/user.json`,
        'utf8'
      );
      usersData ? (this.users = JSON.parse(usersData)) : (this.users = []);
    } catch (err) {
      this.users = [];
    }
  }

  async saveUsersToFile() {
    try {
      const usersData = JSON.stringify(this.users, null, 2);
      await fs.writeFile(`${__dirname}/json/user.json`, usersData);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = UserManager;
