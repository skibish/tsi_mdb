'use strict';

const Faker = require('faker');
const mongoose = require('mongoose');
const Session = require('./app/models/session');
const Movie = require('./app/models/movie');
const Auditorium = require('./app/models/auditorium');

mongoose.connect('mongodb://mongo/cinema');

// 1. Generate movies
let movieIds = [];
for (let i = 0; i < 100; i++) {
  let m = new Movie();
  m = Object.assign(m, {
    title: Faker.lorem.words(),
    description: Faker.lorem.paragraph(),
    length: Faker.random.number({min: 45, max: 125}),
  });

  m.save(err => {
    if (err) {
      console.log(err);
      return
    }
  });

  movieIds.push({id: m._id, length: m.length});
}

// 2. add auditories
let auditoryIds = [];

for (let i = 0; i < 100; i++) {
  let a = new Auditorium();

  a = Object.assign(a, {
    name: Faker.lorem.words(),
    // seats: []
  });

  a.save(err => {
    if (err) {
      console.log(err);
      return
    }
  });

  auditoryIds.push(a._id);
}

// 3. generate sessions
for (let i = 0; i < 100; i++) {
  let s = new Session();

  let dtStart = Faker.date.between(new Date('2016-01-01'), new Date('2016-12-31'));
  let dtFinish = new Date(dtStart);

  dtFinish.setMinutes(dtStart.getMinutes() + movieIds[i].length);

  s = Object.assign(s, {
    auditorium_id: auditoryIds[i],
    movie_id: movieIds[i].id,
    dt_start: dtStart,
    dt_finish: dtFinish,
  });

  s.save(err => {
    if (err) {
      console.log(err);
      return
    }
  });

  console.log("generated session: ", i)
}
