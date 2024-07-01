const mongoose = require('mongoose');
const mongoPaginate = require('mongoose-paginate-v2');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  code: { type: String, require: true, unique: true },
  price: {
    type: Number,
    required: true,
  },
  status: { type: Boolean, default: true },
  stock: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['Acción', 'Deporte', 'RPG', 'Carreras'],
  },
  thumbnails: { type: String, required: true },
  users: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
        },
      },
    ],
  },
});
ProductSchema.pre('findOne', function () {
  this.populate('users.user');
});
ProductSchema.plugin(mongoPaginate);
const Product = mongoose.model('products', ProductSchema);
module.exports = Product;
