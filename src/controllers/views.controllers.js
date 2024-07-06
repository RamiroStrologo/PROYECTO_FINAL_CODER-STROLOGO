const index = async (req, res) => {
  res.render('index');
};

const login = async (req, res) => {
  res.render('login');
};
const logup = async (req, res) => {
  res.render('logup');
};
const products = async (req, res) => {
  const { username, email, rol } = req.session.passport.user;
  res.render('products', { username, email, rol });
};
const cart = async (req, res) => {
  res.render('cart');
};
const productManager = async (req, res) => {
  res.render('managerProds');
};
const usersManager = async (req, res) => {
  res.render('managerUsers');
};

const passRecovery = (req, res) => {
  res.render('passrecovery');
};

module.exports = {
  login,
  logup,
  products,
  cart,
  productManager,
  usersManager,
  passRecovery,
  index,
};
