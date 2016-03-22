'use strict';

const RowSeat = require('../models/rowSeat');

const RowSeatController = {

  /**
   * Create new rowSeat
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  create: function(req, res) {
    let rowSeat = new RowSeat();
    rowSeat = Object.assign(rowSeat, req.body);

    rowSeat.save(err => {
      if (err) {
        res.send(err);
      }
    });

    res.json({message: 'RowSeat created!', id: rowSeat._id});
  },

  /**
   * Show list of rowSeats
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    RowSeat.find({is_deleted: false}, (err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
    });
  },

  /**
   * Show rowSeat by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    RowSeat.find({_id: req.params.id, is_deleted: false}, (err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
    });
  },

  /**
   * Soft delete rowSeat
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  destroy: function(req, res) {
    RowSeat.findById(req.params.id, (err, found) => {
      if (err) {
        res.send(err);
      }

      found.is_deleted = true;
      found.dt_updated = new Date();

      found.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'RowSeat deleted!'});
      });
    });
  },

  /**
   * Update rowSeat
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    RowSeat.findById(req.params.id, (err, found) => {
      if (err) {
        res.send(err);
      }

      found = Object.assign(found, req.body);
      found.dt_updated = new Date();

      found.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'RowSeat updated!'});
      });
    });
  }

}

module.exports = RowSeatController;
