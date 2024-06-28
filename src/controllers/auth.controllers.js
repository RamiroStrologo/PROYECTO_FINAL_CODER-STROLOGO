const register = async (req, res) => {
  try {
    res.redirect('/views/login');
  } catch (err) {
    console.error(err);
  }
};
const login = async (req, res) => {
  try {
    res.redirect('/views/products');
  } catch (err) {
    console.error(err);
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      err ? res.send(err) : res.redirect('/views/login');
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { register, login, logout };
