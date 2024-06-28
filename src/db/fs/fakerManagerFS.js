const fs = require('fs/promises');
const { generateProducts } = require('../../utils/faker');

class fakerManager {
  async generateProductsFaker() {
    try {
      const newProducts = [];
      for (let i = 0; i <= 10; i++) {
        newProducts.push(generateProducts());
      }
      const productsData = await fs.readFile(
        `${__dirname}/json/product.json`,
        'utf8'
      );
      let products = JSON.parse(productsData);
      products = products.concat(newProducts);
      const updatedProductsData = JSON.stringify(products, null, 2);
      await fs.writeFile(`${__dirname}/json/product.json`, updatedProductsData);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}
module.exports = fakerManager;
