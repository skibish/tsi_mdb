'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  birthday: Date,
  is_deleted: {
    type: Boolean,
    default: false,
    select: false,
  },
  dt_created: {
    type: Date,
    default: new Date()
  },
  dt_updated: {
    type: Date,
    default: new Date('1999-01-01')
  },
  name: String,
  birthday: Date,
  email: String,
  phone: String,
  address: {
    country: String,
    city: String,
    street: String,
    home: String
  },
  card_number: String,
  payment_ids: [Schema.Types.ObjectId],
  discount: Number, // 0, 0.3, 0.25,
  type: {
    type: String,
    enum: [
      "anonymous",
      "registered"
    ],
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
