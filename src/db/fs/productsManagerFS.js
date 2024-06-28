const fs = require('fs/promises');
const { createCode } = require('../../utils/bcrypts');

class ProductManager {
  constructor() {
    this.products = [];
  }

  async getProducts() {
    try {
      const productsData = await fs.readFile(
        `${__dirname}/json/product.json`,
        'utf8'
      );
      const products = JSON.parse(productsData);
      return products;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async addProduct(newProduct) {
    try {
      const productsData = await this.getProducts();
      const products = JSON.parse(productsData);
      newProduct.code = createCode(3).toUpperCase();
      products.push(newProduct);
      const updatedProductsData = JSON.stringify(products, null, 2);
      await fs.writeFile(`${__dirname}/json/product.json`, updatedProductsData);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async delProduct(code) {
    try {
      const productsData = await this.getProducts();
      let products = JSON.parse(productsData);

      const index = products.findIndex((product) => product.code === code);

      if (index !== -1) {
        products.splice(index, 1);
      }

      const updatedProductsData = JSON.stringify(products, null, 2);

      await fs.writeFile(`${__dirname}/json/product.json`, updatedProductsData);

      return index !== -1;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = ProductManager;
