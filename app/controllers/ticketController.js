'use strict';

const Ticket = require('../models/ticket');

const TicketController = {

  /**
   * Create new ticket
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  create: function(req, res) {
    let ticket = new Ticket();
    ticket = Object.assign(ticket, req.body);

    ticket.save(err => {
      if (err) {
        res.send(err);
      }

      res.json({message: 'Ticket created!', id: ticket._id});
    });
  },

  /**
   * Show list of ticket
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    Ticket.find((err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
    });
  },

  /**
   * Show ticket by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    Ticket.find({_id: req.params.id}, (err, found) => {
      if (err) {
        res.send(err);
      }

      res.json(found);
    });
  },

  /**
   * Update ticket
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    Ticket.findById(req.params.id, (err, found) => {
      if (err) {
        res.send(err);
      }

      found = Object.assign(found, req.body);
      found.dt_updated = new Date();

      found.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'Ticket user updated!'});
      });
    });
  }

}

module.exports = TicketController;
