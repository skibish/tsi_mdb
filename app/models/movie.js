'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
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
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  length: {
    type: Number, // in minutes
    required: true
  }
});

module.exports = mongoose.model('Movie', MovieSchema);
