const mongoose = require('mongoose');

const CompraSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);
const Compra = mongoose.model('compra', CompraSchema);
module.exports = Compra;
