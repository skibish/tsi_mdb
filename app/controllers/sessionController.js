'use strict';

const Session = require('../models/session');

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
    Session.find({is_deleted: false}, (err, found) => {
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
    Session.find({_id: req.params.id, is_deleted: false}, (err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
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
