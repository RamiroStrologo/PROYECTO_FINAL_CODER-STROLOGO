const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    carts: {
      type: [
        {
          cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'carts',
          },
        },
      ],
      required: false,
    },
    rol: {
      type: String,
      required: true,
      enum: ['user', 'admin', 'premium'],
    },
    lastLogin: { type: Date, default: null },
  },
  {
    timestamps: true,
    strict: false,
  }
);
const User = mongoose.model('users', UserSchema);
module.exports = User;
