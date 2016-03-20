'use strict';

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
let url = 'mongodb://mongo:27017/app';
// Use connect method to connect to the Server
MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    db.close();
});
