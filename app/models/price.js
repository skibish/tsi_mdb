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
  amount: Number,
  type_id: Schema.Types.ObjectId
});

module.exports = mongoose.model('Price', PriceSchema);
