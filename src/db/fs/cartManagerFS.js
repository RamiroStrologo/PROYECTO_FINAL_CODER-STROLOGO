const fs = require('fs/promises');
const { createCode } = require('../../utils/bcrypts');

class CartManager {
  constructor() {
    this.cart = [];
  }

  async addCart() {
    try {
      const newCart = { _id: this.createId(10), products: [] };
      this.cart = await this.loadCartFromFile();
      this.cart.push(newCart);
      await this.saveCartToFile();
      return newCart;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getCartById(id) {
    try {
      this.cart = await this.loadCartFromFile();
      const cart = this.cart.find((cart) => cart._id === id);
      return cart || null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async delProdById(cid, pid) {
    try {
      this.cart = await this.loadCartFromFile();
      const cartIndex = this.cart.findIndex((cart) => cart._id === cid);
      if (cartIndex !== -1) {
        this.cart[cartIndex].products = this.cart[cartIndex].products.filter(
          (prod) => prod.product._id.toString() !== pid
        );
        await this.saveCartToFile();
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async addProdToCart(cId, pId) {
    try {
      this.cart = await this.loadCartFromFile();
      const cartIndex = this.cart.findIndex((cart) => cart._id === cId);
      if (cartIndex !== -1) {
        this.cart[cartIndex].products.push({ product: pId });
        await this.saveCartToFile();
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  async deleteAll(id) {
    try {
      this.cart = await this.loadCartFromFile();
      const cartIndex = this.cart.findIndex((cart) => cart._id === id);
      if (cartIndex !== -1) {
        this.cart[cartIndex].products = [];
        await this.saveCartToFile();
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  createId(num) {
    let id = createCode(num);
    return id;
  }
  async loadCartFromFile() {
    try {
      const cartData = await fs.readFile(`${__dirname}/json/cart.json`, 'utf8');
      const carts = JSON.parse(cartData);
      return carts;
    } catch (err) {
      return [];
    }
  }
  async saveCartToFile() {
    const cartData = JSON.stringify(this.cart, null, 2);
    await fs.writeFile(`${__dirname}/json/cart.json`, cartData);
  }
}

module.exports = CartManager;
