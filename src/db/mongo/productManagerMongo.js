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
      const created = await Products.create(newProduct);
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
}

module.exports = ProductManager;
