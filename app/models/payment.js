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
  full_price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: [
      "success",
      "fail"
    ],
    required: true
  },
  tickets: {
    type: [Schema.Types.ObjectId],
    required: true
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
