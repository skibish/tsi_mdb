'use strict';

const AnonymousUser = require('../models/anonymousUser');

const AnonymousUserController = {

  /**
   * Create new anonymous user
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  create: function(req, res) {
    let anonymousUser = new AnonymousUser();
    anonymousUser.birthday = new Date(req.body.birthday);

    anonymousUser.save(err => {
      if (err) {
        res.send(err);
      }
    });

    res.json({message: 'Anonymous user created!', id: anonymousUser._id});
  },

  /**
   * Show list of user
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    AnonymousUser.find({is_deleted: false}, (err, auser) => {
      if (err) {
        res.send(err);
      }

      res.json(auser);
    });
  },

  /**
   * Show anonymous user by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    AnonymousUser.find({_id: req.params.id, is_deleted: false}, (err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
    });
  },

  /**
   * Soft delete anonymous user
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  destroy: function(req, res) {
    AnonymousUser.findById(req.params.id, (err, found) => {
      if (err) {
        res.send(err);
      }

      found.is_deleted = true;
      found.dt_updated = new Date();

      found.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'Anonymous user deleted!'});
      });
    });
  },

  /**
   * Update anonymous user
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    AnonymousUser.findById(req.params.id, (err, found) => {
      if (err) {
        res.send(err);
      }

      if (req.body.hasOwnProperty('birthday')) {
        found.birthday = new Date(req.body.birthday);
      }

      found.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'Anonymous user updated!'});
      });
    });
  }

}

module.exports = AnonymousUserController;
