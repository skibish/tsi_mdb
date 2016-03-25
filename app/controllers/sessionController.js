'use strict';

const Session = require('../models/session');
const Auditorium = require('../models/auditorium');
const Ticket = require('../models/ticket');
const Helper = require('../helpers');

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

    session.save(err => {
      if (err) {
        res.send(err);
      }
    });

    res.json({message: 'Session created!', id: session._id});
  },

  /**
   * Show list of sessions
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    if (req.query.from === undefined || req.query.to === undefined) {
      return res.status(400).json({"message": "Dates must be specified with `from` and `to`."});
    }

    let dtFrom = new Date(req.query.from);
    let dtTo = new Date(req.query.to);

    if (! (Helper.isDateValid(dtFrom) && Helper.isDateValid(dtTo)) ) {
      return res.status(400).json({"message": "Bad dates format, check."});
    }

    Session.find({is_deleted: false, dt_start: {"$gte": dtFrom}, dt_finish: {"$lte": dtTo}}, (err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
    });
  },

  /**
   * Show session by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    // seach for asked session
    Session.find({_id: req.params.id, is_deleted: false}, (err, foundS) => {
      if (err) {
        res.send(err);
      }

      // if nothing found, answer with it
      if (!foundS.length) {
        res.json(foundS);
      }

      // search for auditorium
      Auditorium.findById(foundS[0].auditorium_id, (err, foundA) => {
        if (err) {
          res.send(err);
        }

        // generate map of seats and their availability status
        let mapOfSeats = {};
        foundA.seats.forEach((v,i,a) => {
          mapOfSeats[v] = true;
        });

        // find all tickets for current session
        Ticket.find({session_id: req.params.id}, (err, foundT) => {
          if (err) {
            res.send(err);
          }

          // mark seats, that are already bought
          foundT.forEach((v,i,a) => {
            if (mapOfSeats.hasOwnProperty(v.row_seat_id)) {
              mapOfSeats[v.row_seat_id] = false;
            }
          });
          let objResponse = Object.assign(foundS[0].toObject(), {seats: mapOfSeats})

          res.json(objResponse);
        });

      });
    });
  },

  /**
   * Soft delete session
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  destroy: function(req, res) {
    Session.findById(req.params.id, (err, found) => {
      if (err) {
        res.send(err);
      }

      found.is_deleted = true;
      found.dt_updated = new Date();

      found.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'Session deleted!'});
      });
    });
  },

  /**
   * Update session
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    Session.findById(req.params.id, (err, found) => {
      if (err) {
        res.send(err);
      }

      found = Object.assign(found, req.body);
      found.dt_updated = new Date();

      found.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'Session updated!'});
      });
    });
  }

}

module.exports = SessionController;
