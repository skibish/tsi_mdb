'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const AnonymousUserController = require('./app/controllers/anonymousUserController');
const RegisteredUserController = require('./app/controllers/registeredUserController');

mongoose.connect('mongodb://mongo/cinema');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || '8080';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'It works!'});
});

// routes for AnonymousUser
router.route('/user/anonymous')
  .post(AnonymousUserController.create)
  .get(AnonymousUserController.index);

router.route('/user/anonymous/:id')
  .get(AnonymousUserController.show)
  .put(AnonymousUserController.update)
  .delete(AnonymousUserController.destroy);

// routes for RegisteredUser
router.route('/user/registered')
  .post(RegisteredUserController.create)
  .get(RegisteredUserController.index);

router.route('/user/registered/:id')
  .get(RegisteredUserController.show)
  .put(RegisteredUserController.update)
  .delete(RegisteredUserController.destroy);

app.use('/api', router);

app.listen(port);
console.info('Started at port ' + port);
