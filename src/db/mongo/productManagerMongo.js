const Products = require('./models/products.model');
const { createCode } = require('../../utils/bcrypts');

class ProductManager {
  constructor() {
    this.products = [];
  }

  async getProducts(querys) {
    try {
      let response = await Products.paginate(
        querys.category ? { category: querys.category } : {},
        {
          limit: querys.limit ? querys.limit : 10,
          sort: querys.sort ? { price: querys.sort } : null,
          page: querys.page ? querys.page : 1,
        }
      );
      return response;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async addProduct(newProduct) {
    try {
      newProduct.code = createCode(3).toUpperCase();
      const ownUser = newProduct.users;
      delete newProduct.users;
      const created = await Products.create(newProduct);
      const prod = await Products.findOne({ code: newProduct.code });
      prod.users.push(ownUser);
      await prod.save();
      return created ? true : false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  async delProduct(code) {
    try {
      const response = await Products.deleteOne({ code: code });
      return response.deletedCount > 0 ? true : false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  // async delProduct(code) {
  //   try {
  //     const prod = await this.findProd(code);
  //     const rol = prod.users[0].rol;
  //     if (rol !== 'premium') {
  //       const response = await Products.deleteOne({ code: code });
  //       return response.deletedCount > 0 ? true : false;
  //     } else if (rol === 'premium') {
  //       const response = await Products.deleteOne({ code: code });
  //       if (response.deletedCount > 0) {
  //         await fetch('/api/mailer/delPremiumProd', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ code: code, email: prod.users[0].email }),
  //         });
  //         return true;
  //       } else return false;
  //     } else return false;
  //   } catch (err) {
  //     console.error(err);
  //     return false;
  //   }
  // }

  // async findProd(code) {
  //   try {
  //     const prod = await Products.findOne({ code: code });
  //     return prod.users[0].rol;
  //   } catch (err) {
  //     console.error(err);
  //     return false;
  //   }
  // }
}

module.exports = ProductManager;
