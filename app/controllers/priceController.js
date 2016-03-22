'use strict';

const Price = require('../models/price');

const PriceController = {

  /**
   * Create new price
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  create: function(req, res) {
    let price = new Price();
    price = Object.assign(price, req.body);

    price.save(err => {
      if (err) {
        res.send(err);
      }
    });

    res.json({message: 'Price created!', id: price._id});
  },

  /**
   * Show list of prices
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    Price.find({is_deleted: false}, (err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
    });
  },

  /**
   * Show price by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    Price.find({_id: req.params.id, is_deleted: false}, (err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
    });
  },

  /**
   * Soft delete price
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  destroy: function(req, res) {
    Price.findById(req.params.id, (err, found) => {
      if (err) {
        res.send(err);
      }

      found.is_deleted = true;
      found.dt_updated = new Date();

      found.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'Price deleted!'});
      });
    });
  },

  /**
   * Update price
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    Price.findById(req.params.id, (err, found) => {
      if (err) {
        res.send(err);
      }

      found = Object.assign(found, req.body);
      found.dt_updated = new Date();

      found.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'Price updated!'});
      });
    });
  }

}

module.exports = PriceController;
