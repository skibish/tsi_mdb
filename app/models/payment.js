'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  dt_created: {
    type: Date,
    default: new Date()
  },
  dt_updated: {
    type: Date,
    default: new Date('1999-01-01')
  },
  full_price: Number,
  status: String,
  tickets: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Payment', PaymentSchema);
