'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  is_deleted: {
    type: Boolean,
    default: false,
    select: false,
  },
  dt_created: {
    type: Date,
    default: new Date(),
  },
  dt_updated: {
    type: Date,
    default: new Date('1999-01-01')
  },
  auditorium_id: {
    type: Schema.Types.ObjectId,
    ref: 'Auditorium',
    required: true
  },
  movie_id: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  dt_start: {
    type: Date,
    required: true
  },
  dt_finish: {
    type: Date,
    required: true
  },
  seats: {
    type: Schema.Types.Mixed,
    required: true
  },
});

module.exports = mongoose.model('Session', SessionSchema);
