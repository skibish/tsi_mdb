'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const AnonymousUserController = require('./app/controllers/anonymousUserController');
const RegisteredUserController = require('./app/controllers/registeredUserController');
const PaymentController = require('./app/controllers/paymentController');
const TicketController = require('./app/controllers/ticketController');
const PriceController = require('./app/controllers/priceController');

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

// routes for Payment
router.route('/payment')
  .post(PaymentController.create)
  .get(PaymentController.index);

router.route('/payment/:id')
  .get(PaymentController.show)
  .put(PaymentController.update);

// routes for Ticket
router.route('/ticket')
  .post(TicketController.create)
  .get(TicketController.index);

router.route('/ticket/:id')
  .get(TicketController.show)
  .put(TicketController.update);

// routes for Price
router.route('/price')
  .post(PriceController.create)
  .get(PriceController.index);

router.route('/price/:id')
  .get(PriceController.show)
  .put(PriceController.update);

app.use('/api', router);

app.listen(port);
console.info('Started at port ' + port);
