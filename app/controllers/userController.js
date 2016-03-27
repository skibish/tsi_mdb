'use strict';

const User = require("../models/user");

const UserController = {

  /**
   * Create new registered user
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  create: function(req, res) {
    let user = new User();
    user = Object.assign(user, req.body);
    use.save()
    .then(user => {
      res.json({message: "User created!", id: user._id});

    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Show list of user
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    User.find({is_deleted: false}).exec()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Show registered user by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    User.findOne({_id: req.params.id, is_deleted: false}).exec()
    .then(user => {
      res.json(user);
    }).catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Soft delete registered user
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  destroy: function(req, res) {
    User.findById(req.params.id).exec()
    .then(user => {
      user.is_deleted = true;
      user.dt_updated = new Date();

      return user.save();
    })
    .then(user => {
      res.json({message: "User deleted!"});
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Update registered user
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    User.findById(req.params.id).exec()
    .then(user => {
      user = Object.assign(user, req.body);
      user.dt_updated = new Date();

      return user.save();
    })
    .then(user => {
      res.json({message: "User updated!"});

    })
    .catch(err => {
      res.status(500).send(err);
    });m
  }

}

module.exports = UserController;
