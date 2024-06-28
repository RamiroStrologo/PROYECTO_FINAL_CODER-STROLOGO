const mongoose = require('mongoose');
const varConfig = require('../../config/envVarConfig');
module.exports = {
  connect: () => {
    return mongoose
      .connect(varConfig.string_con)
      .then(() => {
        console.log('bd connected');
      })
      .catch((err) => {
        console.log('bd connection failed', err);
      });
  },
};
