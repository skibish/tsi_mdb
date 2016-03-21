'use strict';

const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const AnonymousUserSchema = new Schema({
  birthday: Date,
  is_deleted: {type: Boolean, default: false},
  dt_created: {type: Date, default: new Date()},
  dt_updated: {type: Date, default: new Date('1999-01-01')},
});

module.exports = mongoose.model('AnonymousUser', AnonymousUserSchema);
