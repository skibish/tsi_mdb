'use strict';

const Session      = require("../models/session");
const Auditorium   = require("../models/auditorium");
const Ticket       = require("../models/ticket");
const Helper       = require("../helpers");
const AppException = require("../exceptions/appException");

const SessionController = {

  /**
   * Create new session
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  create: function(req, res) {
    let session = new Session();
    session = Object.assign(session, req.body);

    Auditorium.findById(req.body.auditorium_id).exec()
    .then(auditorium => {
      if (auditorium === null) {
        throw new AppException("Auditorium not found.", 400);
      }
      // generate map of seats and their availability status
      let mapOfSeats = {};
      auditorium.seats.forEach((e,i,a) => {
        mapOfSeats[v] = true;
      });

      session.seats = mapOfSeats;

      return session.save();
    })
    .then(session => {
      res.json({message: "Session created!", id: session._id});
    })
    .catch(err => {
      if (err.name === "AppException") {
        res.status(err.status).json({message: err.message});
      } else {
        res.status(500).send(err);
      }
    });
  },

  /**
   * Show list of sessions
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    try {
      if (req.query.from === undefined || req.query.to === undefined) {
        throw new AppException("Dates must be specified with `from` and `to`.", 400);
      }

      let dtFrom = new Date(req.query.from);
      let dtTo = new Date(req.query.to);

      if (! (Helper.isDateValid(dtFrom) && Helper.isDateValid(dtTo)) ) {
        throw new AppException("Bad dates format, check.", 400);
      }

      Session.find({is_deleted: false, dt_start: {"$gte": dtFrom}, dt_finish: {"$lte": dtTo}}).exec()
      .then(sessions => {
        res.json(sessions);
      })
      .catch(err => {
        throw new Error(err);
      });
    } catch (e) {
      if (e.name === "AppException") {
        res.status(e.status).json({message: e.message});
      } else {
        res.status(500).send(e);
      }
    }
  },

  /**
   * Show session by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    // seach for asked session
    Session.findOne({_id: req.params.id, is_deleted: false}).exec()
    .then(session => {
      res.json(session);
    })
    .catch(err => {
      res.send(err);
    });
  },

  /**
   * Soft delete session
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  destroy: function(req, res) {
    Session.findById(req.params.id).exec()
    .then(session => {
      session.is_deleted = true;
      session.dt_updated = new Date();

      return session.save();
    })
    .then(session => {
      res.json({message: "Session deleted!"});
    })
    .catch(err => {
      res.send(err);
    });
  },

  /**
   * Update session
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    Session.findById(req.params.id).exec()
    .then(session => {
      session = Object.assign(session, req.body);
      session.dt_updated = new Date();

      return session.save();
    })
    .then(session => {
      res.json({message: "Session updated!"});
    })
    .catch(err => {
      res.send(err);
    });
  }

}

module.exports = SessionController;
