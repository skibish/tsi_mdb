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
  auditorium_id: Schema.Types.ObjectId,
  movie_id: Schema.Types.ObjectId,
  dt_start: Date,
  dt_finish: Date,
  seats: Schema.Types.Mixed,
});

module.exports = mongoose.model('Session', SessionSchema);
