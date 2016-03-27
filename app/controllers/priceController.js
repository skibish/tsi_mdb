'use strict';

const Price = require("../models/price");

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
    price.save()
    .then(price => {
      res.json({message: "Price created!", id: price._id});
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Show list of prices
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    Price.find({is_deleted: false}).exec()
    .then(prices => {
      res.json(prices);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Show price by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    Price.findOne({_id: req.params.id, is_deleted: false}).exec()
    .then(price => {
      res.json(price);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Soft delete price
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  destroy: function(req, res) {
    Price.findById(req.params.id).exec()
    .then(price => {
      price.is_deleted = true;
      price.dt_updated = new Date();

      return price.save();

    }).then(price => {
      res.json({message: "Price deleted!"});
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Update price
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    Price.findById(req.params.id).exec()
    .then(price => {
      price = Object.assign(price, req.body);
      price.dt_updated = new Date();

      return price.save();
    })
    .then(price => {
      res.json({message: "Price updated!"});
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }

}

module.exports = PriceController;
