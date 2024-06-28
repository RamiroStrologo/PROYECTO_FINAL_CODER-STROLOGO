const Cart = require('./models/carts.model');

class CartManager {
  constructor() {
    this.cart = [];
  }

  async addCart() {
    try {
      const createdCart = await Cart.create({ products: [] });
      return createdCart;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getCartById(id) {
    try {
      this.cart = Cart.findOne({ _id: id });
      return this.cart;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async delProdById(cid, pid) {
    try {
      let cart = await Cart.findOne({ _id: cid });
      if (cart) {
        cart.products = cart.products.filter(
          (prod) => prod.product._id.toString() !== pid
        );
        await cart.save();
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
      this.cart = await Cart.findOne({ _id: cId });

      this.cart.products.push({ product: pId });
      await this.cart.save();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  async deleteAll(id) {
    try {
      await Cart.updateOne({ _id: id }, { $set: { products: [] } });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = CartManager;
