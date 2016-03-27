"use strict";

const Faker      = require("faker");
const mongoose   = require("mongoose");
const Session    = require("./app/models/session");
const Movie      = require("./app/models/movie");
const Price      = require("./app/models/price");
const Auditorium = require("./app/models/auditorium");

mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://mongo/cinema");

let seatsArray = [];
let seatsObj = {};
let movieDocuments = [];
let auditoriumDocuments = [];
let sessionDocuments = [];
let priceDocuments = [];

// 1. generate 20x20 seat ids
for (let i = 1; i <= 20; i++) {
  for (let j = 1; j <= 20; j++) {
    seatsArray.push(`${i}:${j}`);
  }
}

for (let i = 0; i < seatsArray.length; i++) {
  seatsObj[seatsArray[i]] = true;
}

// 1. Generate movies, auditories and sessions
for (let i = 0; i < 100; i++) {

  // create movie
  let m = new Movie({
    title: Faker.lorem.words(),
    description: Faker.lorem.paragraph(),
    length: Faker.random.number({min: 45, max: 125}),
  });

  // create auditorium
  let a = new Auditorium({
    name: Faker.lorem.words(),
    seats: seatsArray
  });

  // create session
  let s = new Session();

  let dtStart = Faker.date.between(new Date("2016-01-01"), new Date("2016-12-31"));
  let dtFinish = new Date(dtStart);

  dtFinish.setMinutes(dtStart.getMinutes() + m.length);

  s = new Session({
    auditorium_id: a._id,
    movie_id: m._id,
    dt_start: dtStart,
    dt_finish: dtFinish,
    seats: seatsObj,
  });

  // add data to array
  movieDocuments.push(m);
  auditoriumDocuments.push(a);
  sessionDocuments.push(s);
}

// 2. generate prices
for (let i = 0; i < 3; i++) {
  let p = new Price({
    amount: Faker.finance.amount(3, 12),
    type: Faker.lorem.word(),
    description: Faker.lorem.paragraph()
  });

  priceDocuments.push(p);
}


// 3. run inserts
Movie.insertMany(movieDocuments)
.then(() => Auditorium.insertMany(auditoriumDocuments))
.then(() => Session.insertMany(sessionDocuments))
.then(() => Price.insertMany(priceDocuments))
.then(() => {
  mongoose.disconnect(() => {
    console.log("Data generated!");
  });
})
.catch(err => {
  console.log(err);
});
