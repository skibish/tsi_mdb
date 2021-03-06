'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditoriumSchema = new Schema({
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
  name: {type: String, required: true},
  seats: {type: [String], required: true}
});

module.exports = mongoose.model('Auditorium', AuditoriumSchema);
