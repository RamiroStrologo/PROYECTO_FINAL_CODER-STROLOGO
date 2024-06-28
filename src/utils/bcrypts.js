const bcrypt = require('bcrypt');
const crypto = require('crypto');

const createHash = (password) => {
  let pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return pass;
};
const isValid = (passwordEntered, passwordDb) => {
  let decrypt = bcrypt.compareSync(passwordEntered, passwordDb);
  return decrypt;
};
const createCode = (num) => {
  const randomCode = crypto.randomBytes(num).toString('hex');
  return randomCode;
};

module.exports = { createCode, createHash, isValid };
