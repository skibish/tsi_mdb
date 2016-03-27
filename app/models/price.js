'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
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
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  description: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Price', PriceSchema);
