'use strict';

const Movie = require("../models/movie");

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

    movie.save()
    .then(movie => {
      res.json({message: "Movie created!", id: movie._id});

    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Show list of movies
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    Movie.find({is_deleted: false}).exec()
    .then(movies => {
      res.json(movies);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  },

  /**
   * Show movie by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    Movie.findOne({_id: req.params.id, is_deleted: false}).exec()
    .then(movie => {
      res.json(movie);
    }).catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Soft delete movie
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  destroy: function(req, res) {
    Movie.findById(req.params.id).exec()
    .then(movie => {
      movie.is_deleted = true;
      movie.dt_updated = new Date();

      return movie.save();
    })
    .then(movie => {
      res.json({message: "Movie deleted!"});
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Update movie
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    Movie.findById(req.params.id).exec()
    .then(movie => {
      movie = Object.assign(movie, req.body);
      movie.dt_updated = new Date();

      return movie.save();
    })
    .then(movie => {
      res.json({message: "Movie updated!"});
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }
}

module.exports = MovieController;
