'use strict';

const Payment = require('../models/payment');
const RegisteredUser = require('../models/registeredUser');
const Session = require('../models/session');

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

    // find user
    RegisteredUser.findById(req.body.user_id, (err, foundU) => {
      if (err) {
        res.send(err);
      }

      // if not found, return error
      if (foundU === null) {
        res.status(400).json({message: "User not correct"});
      }

      // if `sessions` id not array - return error
      if (! Array.isArray(req.body.sessions)) {
        res.status(400).json({message: "sessions must be array"});
      }

      // collect map {session_id: ["1:1", ...]}
      let mapOfSessionIdToSeats = {};
      req.body.sessions.forEach((e, i , a) => {
        mapOfSessionIdToSeats[e.session_id] = e.seats;
      });

      // try to find all asked sessions
      let listOfSessionIDs = Object.keys(mapOfSessionIdToSeats);
      Session.find({'_id': {$in: listOfSessionIDs}}, (err, foundS) => {
        if (err) {
          res.send(err);
        }

        // if size of found and asked differs, return error
        if (foundS.length !== listOfSessionIDs.length) {
          res.status(400).json({message: "Not all sessions found"});
        }

        // from what found form structure {session_id: {"1:1": true, ...}}
        let cleaned = {};
        foundS.forEach((e, i , a) => {
          cleaned[e._id] = e.seats;
        });

        // iterate through all and validate, that asked places are available
        let errors = [];
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
          res.status(400).json({message: "Following seats are taken", data: errors});
        }

        // Update sessions seats
        let ticketCount = 0;
        for (let key in mapOfSessionIdToSeats) {
          for (let i = 0; i < mapOfSessionIdToSeats[key].length; i++) {
            cleaned[key][mapOfSessionIdToSeats[key][i]] = false;
            ticketCount++;
          }

          Session.findByIdAndUpdate(key, { $set: {"seats": cleaned[key]} }, (err, updatedS) => {
            if (err) {
              res.send(err);
            }
          });
        }

        // mark payment status as reserved
        payment.status = "reserved";
        // TODO: calculate amount

        // and save it
        payment.save(err => {
          if (err) {
            res.send(err);
          }

          res.json({message: 'Payment reserved!', id: payment._id});
        });
      });
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
