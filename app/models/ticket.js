'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
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
  session_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  row_seat_id: {
    type: String,
    required: true
  },
  price_id: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Ticket', TicketSchema);
