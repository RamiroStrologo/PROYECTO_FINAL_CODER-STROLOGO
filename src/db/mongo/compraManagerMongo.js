const Compra = require('./models/compra.model');
const { createCode } = require('../../utils/bcrypts');
const varConfig = require('../../config/envVarConfig');

class CompraManager {
  async realizarCompra(data) {
    try {
      data.code = createCode(10);
      await Compra.create(data);
      await fetch(
        `http://localhost:${varConfig.port}/api/cart/delAll/${data.cartId}`,
        {
          method: 'PUT',
        }
      );
      const response1 = await fetch(
        'http://localhost:8080/api/mailer/endPurchase',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      console.log('Email enviado', response1.ok);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = CompraManager;
