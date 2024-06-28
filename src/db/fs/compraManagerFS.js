const fs = require('fs/promises');
const { createCode } = require('../../utils/bcrypts');
const varConfig = require('../../config/envVarConfig');

class CompraManager {
  async realizarCompra(data) {
    try {
      data.code = createCode(10);
      const comprasData = await fs.readFile(
        `${__dirname}/json/compras.json`,
        'utf8'
      );
      let compras = JSON.parse(comprasData);
      compras.push(data);
      const updatedComprasData = JSON.stringify(compras, null, 2);
      await fs.writeFile('compras.json', updatedComprasData);
      await fetch(
        `http://localhost:${varConfig}/api/cart/delAll/${data.cartId}`,
        {
          method: 'PUT',
        }
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = CompraManager;
