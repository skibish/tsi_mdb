'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisteredUserSchema = new Schema({
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
  discount: Number
});

module.exports = mongoose.model('RegisteredUser', RegisteredUserSchema);
