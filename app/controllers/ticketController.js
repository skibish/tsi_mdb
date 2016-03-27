'use strict';

const Ticket = require("../models/ticket");

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
    ticket.save()
    .then(ticket => {
      res.json({message: "Ticket created!", id: ticket._id});
    })
    .catch(err => {
      res.status(500).res.send(err);
    });
  },

  /**
   * Show list of ticket
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  index: function(req, res) {
    Ticket.findOne({is_deleted: false}).exec()
    .then(tickets => {
      res.json(tickets);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Show ticket by ID
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  show: function(req, res) {
    Ticket.find({_id: req.params.id, is_deleted: false}).exec()
    .then(ticket => {
      res.json(ticket);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Soft delete ticket
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  destroy: function(req, res) {
    Ticket.findById(req.params.id).exec()
    .then(ticket => {
      ticket.is_deleted = true;
      ticket.dt_updated = new Date();

      return ticket.save();

    }).then(ticket => {
      res.json({message: "Ticket deleted!"});
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  /**
   * Update ticket
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {void}
   */
  update: function(req, res) {
    Ticket.findById(req.params.id).exec()
    .then(ticket => {
      ticket = Object.assign(ticket, req.body);
      ticket.dt_updated = new Date();

      return ticket.save()
    })
    .then(ticket => {
      res.json({message: "Ticket user updated!"});

    })
    .catch(err => {
      res.status(500).send(err);
    });
  }

}

module.exports = TicketController;
