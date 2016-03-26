'use strict';

const Payment = require('../models/payment');
const RegisteredUser = require('../models/registeredUser');
const Session = require('../models/session');
const Price = require('../models/price');
const Ticket = require('../models/ticket');

const PaymentController = {

  /**
   * Create new payement
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  create: function(req, res) {
    // create payment object
    let payment = new Payment();
    payment = Object.assign(payment, req.body);

    let listOfSessionIDs = [];
    let mapOfSessionIdToSeats = {};
    let cleaned = {};
    let errors = [];
    let ticketCount = 0;
    let discount = 0;

    RegisteredUser.findById(req.body.user_id).exec()
    .then(foundU => {
      // if not found, return error
      if (foundU === null) {
        let msg = "User not correct";
        res.status(400).json({message: msg});
        throw new Error(msg);
      }

      discount = foundU.discount;

    })
    .then(() => {
      // if `sessions` id not array - return error
      if (! Array.isArray(req.body.sessions)) {
        let msg = "sessions must be array";
        res.status(400).json({message: msg});
        throw new Error(msq);
      }

      // collect map {session_id: ["1:1", ...]}
      req.body.sessions.forEach((e, i , a) => {
        mapOfSessionIdToSeats[e.session_id] = e.seats;
      });

      // try to find all asked sessions
      listOfSessionIDs = Object.keys(mapOfSessionIdToSeats);

      return Session.find({'_id': {$in: listOfSessionIDs}}).exec();
    })
    .then(foundS => {
      // if size of found and asked differs, return error
      if (foundS.length !== listOfSessionIDs.length) {
        let msg = "Not all sessions found";
        res.status(400).json({message: msg});
      }

      // from what found form structure {session_id: {"1:1": true, ...}}
      foundS.forEach((e, i , a) => {
        cleaned[e._id] = e.seats;
      });
    })
    .then(() => {
      // iterate through all and validate, that asked places are available
      for (let key in mapOfSessionIdToSeats) {
        for (let i = 0; i < mapOfSessionIdToSeats[key].length; i++) {
          if (cleaned[key].hasOwnProperty(mapOfSessionIdToSeats[key][i]) && !cleaned[key][mapOfSessionIdToSeats[key][i]]) {
            // if not available, collect
            errors.push({"session_id": key, "seat": mapOfSessionIdToSeats[key][i]});
          }
        }
      }

      // if there are not available places, return error
      if (errors.length) {
        let msg = "Following seats are taken";
        res.status(400).json({message: msg, data: errors});
        throw new Error(msg);
      }

      // Update sessions seats
      for (let key in mapOfSessionIdToSeats) {
        for (let i = 0; i < mapOfSessionIdToSeats[key].length; i++) {
          cleaned[key][mapOfSessionIdToSeats[key][i]] = false;
          ticketCount++;
        }

        Session.findByIdAndUpdate(key, { $set: {"seats": cleaned[key]} }).exec()
        .catch(err => {
          throw new Error(err);
        });
      }

      return Price.findOne({type: req.body.payment.price_type}).exec();
    })
    .then(foundP => {
      if (foundP === null) {
        let msg = "Price type not found";
        res.status(400).json({message: msg});
        throw new Error(msg);
      }

      // TODO: some heavy processing here

      // mark payment status as success or fail
      payment.status = "success";
      let total = ticketCount * foundP.amount;
      payment.full_price = total - (discount * total);

      // iterate over session => seats
      for (let key in mapOfSessionIdToSeats) {
        for (let i = 0; i < mapOfSessionIdToSeats[key].length; i++) {
          let ticket = new Ticket({
            session_id: key,
            row_seat_id: mapOfSessionIdToSeats[key][i],
            price_id: foundP._id
          });
          // add to payment
          payment.tickets.push(ticket._id);

          ticket.save()
          .catch(err => {
            throw new Error(err);
          });
        }
      }

      return payment.save();
    })
    .then((payment) => {
      res.json({message: 'Payment reserved!', id: payment._id});
    })
    .catch(err => {
      console.log("E===>", err);
    });

  },

  /**
   * Show list of payments
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    Payment.find((err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
    });
  },

  /**
   * Show payment by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    Payment.find({_id: req.params.id}, (err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
    });
  },

  /**
   * Update payment
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    Payment.findById(req.params.id, (err, found) => {
      if (err) {
        res.send(err);
      }

      found = Object.assign(found, req.body);
      found.dt_updated = new Date();

      found.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'Payment user updated!'});
      });
    });
  }

}

module.exports = PaymentController;
