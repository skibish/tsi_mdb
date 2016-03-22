'use strict';

const Movie = require('../models/movie');

const MovieController = {

  /**
   * Create new movie
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  create: function(req, res) {
    let movie = new Movie();
    movie = Object.assign(movie, req.body);

    movie.save(err => {
      if (err) {
        res.send(err);
      }
    });

    res.json({message: 'Movie created!', id: movie._id});
  },

  /**
   * Show list of movies
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    Movie.find({is_deleted: false}, (err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
    });
  },

  /**
   * Show movie by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    Movie.find({_id: req.params.id, is_deleted: false}, (err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
    });
  },

  /**
   * Soft delete movie
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  destroy: function(req, res) {
    Movie.findById(req.params.id, (err, found) => {
      if (err) {
        res.send(err);
      }

      found.is_deleted = true;
      found.dt_updated = new Date();

      found.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'Movie deleted!'});
      });
    });
  },

  /**
   * Update movie
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    Movie.findById(req.params.id, (err, found) => {
      if (err) {
        res.send(err);
      }

      found = Object.assign(found, req.body);
      found.dt_updated = new Date();

      found.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'Movie updated!'});
      });
    });
  }

}

module.exports = MovieController;
