const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
      },
    ],
    required: true,
  },
});

CartSchema.pre("findOne", function () {
  this.populate("products.product");
});

const Cart = mongoose.model("carts", CartSchema);
module.exports = Cart;
