'use strict';

const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const AnonymousUserSchema = new Schema({
    birthday: Date
});

module.exports = mongoose.model('AnonymousUser', AnonymousUserSchema);
