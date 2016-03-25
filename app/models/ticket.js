'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  dt_created: {
    type: Date,
    default: new Date()
  },
  dt_updated: {
    type: Date,
    default: new Date('1999-01-01')
  },
  session_id: Schema.Types.ObjectId,
  row_seat_id: String,
  price_id: Schema.Types.ObjectId
});

module.exports = mongoose.model('Ticket', TicketSchema);
