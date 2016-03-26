'use strict';

const User = require('../models/user');

const UserController = {

  /**
   * Create new registered user
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  create: function(req, res) {
    let registeredUser = new User();
    registeredUser = Object.assign(registeredUser, req.body);

    registeredUser.save(err => {
      if (err) {
        res.send(err);
      }
    });

    res.json({message: 'User created!', id: registeredUser._id});
  },

  /**
   * Show list of user
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    User.find({is_deleted: false}, (err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
    });
  },

  /**
   * Show registered user by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    User.find({_id: req.params.id, is_deleted: false}, (err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
    });
  },

  /**
   * Soft delete registered user
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  destroy: function(req, res) {
    User.findById(req.params.id, (err, found) => {
      if (err) {
        res.send(err);
      }

      found.is_deleted = true;
      found.dt_updated = new Date();

      found.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'User deleted!'});
      });
    });
  },

  /**
   * Update registered user
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    User.findById(req.params.id, (err, found) => {
      if (err) {
        res.send(err);
      }

      found = Object.assign(found, req.body);
      found.dt_updated = new Date();

      found.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'User updated!'});
      });
    });
  }

}

module.exports = UserController;
