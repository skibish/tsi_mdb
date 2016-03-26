'use strict';

const Auditorium = require("../models/auditorium");

const AuditoriumController = {

  /**
   * Create new auditorium
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  create: function(req, res) {
    let auditorium = new Auditorium();
    auditorium = Object.assign(auditorium, req.body);

    auditorium.save()
    .then(auditorium => {
      res.json({message: "Auditorium created!", id: auditorium._id});
    })
    .catch(err => {
      res.send(err);
    });

  },

  /**
   * Show list of auditoriums
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    Auditorium.find({is_deleted: false}).exec()
    .then(auditoriums => {
      res.json(auditoriums);
    })
    .catch(err => {
      res.send(err);
    });
  },

  /**
   * Show auditorium by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    Auditorium.findOne({_id: req.params.id, is_deleted: false}).exec()
    .then(auditorium => {
      res.json(auditorium);
    })
    .catch(err => {
      res.send(err);
    });
  },

  /**
   * Soft delete auditorium
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  destroy: function(req, res) {
    Auditorium.findById(req.params.id).exec()
    .then(auditorium => {
      found.is_deleted = true;
      found.dt_updated = new Date();

      return auditorium.save();
    })
    .then(auditorium => {
      res.json({message: "Auditorium deleted!"});

    })
    .catch(err => {
      res.send(err);
    });
  },

  /**
   * Update auditorium
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    Auditorium.findById(req.params.id).exec()
    .then(auditorium => {
      auditorium = Object.assign(auditorium, req.body);
      found.dt_updated = new Date();

      auditorium.save();
    })
    .then(auditorium => {
      res.json({message: "Auditorium updated!"});
    })
    .catch(err => {
      res.send(err);
    });
  }

}

module.exports = AuditoriumController;
