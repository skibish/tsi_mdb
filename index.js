'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const AnonymousUserController = require('./app/controllers/anonymousUserController');

mongoose.connect('mongodb://mongo/cinema');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || '8080';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'It works!'});
});

// route for AnonymousUser
router.route('/user/anonymous')
  .post(AnonymousUserController.create)
  .get(AnonymousUserController.index);

router.route('/user/anonymous/:id')
  .get(AnonymousUserController.show)
  .put(AnonymousUserController.update)
  .delete(AnonymousUserController.destroy);

app.use('/api', router);

app.listen(port);
console.info('Started at port ' + port);
