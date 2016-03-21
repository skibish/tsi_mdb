'use strict';

const Payment = require('../models/payment');

const PaymentController = {

  /**
   * Create new payement
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  create: function(req, res) {
    let payment = new Payment();
    payment = Object.assign(payment, req.body);

    payment.save(err => {
      if (err) {
        res.send(err);
      }
    });

    res.json({message: 'Payment created!', id: payment._id});
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
