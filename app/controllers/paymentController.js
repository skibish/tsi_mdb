'use strict';

const Payment = require("../models/payment");
const User = require("../models/user");
const Session = require("../models/session");
const Price = require("../models/price");
const Ticket = require("../models/ticket");
const AppException = require("../exceptions/appException");

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
    let currentUser;
    let amount = 0;
    let priceID = "";

    Price.findOne({type: req.body.payment.price_type}).exec()
    .then((foundP) => {
      if (foundP === null) {
        throw new AppException("Price type not found", 400);
      }
      amount = foundP.amount;
      priceID = foundP._id;

      return User.findById(req.body.user_id).exec();
    })
    .then(foundU => {
      // if not found, return error
      if (foundU === null) {
        throw new AppException("User not correct", 400);
      }

      currentUser = foundU;
      if (foundU.discount) {
        discount = foundU.discount;
      }

    })
    .then(() => {
      // if `sessions` id not array - return error
      if (! Array.isArray(req.body.sessions)) {
        throw new AppException("sessions must be array", 400);
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
        throw new AppException("Not all sessions found", 400);
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
        throw new AppException("Following seats are taken", 400, errors);
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
    })
    .then(() => {
      // TODO: some heavy processing here

      // mark payment status as success or fail
      payment.status = "success";
      let total = ticketCount * amount;
      payment.full_price = total - (discount * total);

      // iterate over session => seats
      for (let key in mapOfSessionIdToSeats) {
        for (let i = 0; i < mapOfSessionIdToSeats[key].length; i++) {
          let ticket = new Ticket({
            session_id: key,
            row_seat_id: mapOfSessionIdToSeats[key][i],
            price_id: priceID
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
      res.json({message: "Payment reserved!", id: payment._id});
    }).then(() => {
      currentUser.payment_ids.push(payment._id);
      return currentUser.save();
    })
    .catch(err => {
      if (err.name === "AppException") {
        if (err.data != null) {
          res.status(err.status).json({message: err.message, data: err.data});
        } else {
          res.status(err.status).json({message: err.message});
        }
      } else {
        res.status(500).send(err);
      }
    });

  },

  /**
   * Show list of payments
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    Payment.find({}).exec()
    .then(payments => {
      res.json(payments);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Show payment by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    Payment.find({_id: req.params.id}).exec()
    .then(payment => {
      res.json(payment);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Update payment
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    Payment.findById(req.params.id).exec()
    .then(payment => {
      payment = Object.assign(payment, req.body);
      payment.dt_updated = new Date();

      return payment.save();
    })
    .then(payment => {
      res.json({message: "Payment user updated!"});
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }

}

module.exports = PaymentController;
