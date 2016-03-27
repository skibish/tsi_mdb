"use strict";

const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");

const UserController       = require("./app/controllers/userController");
const PaymentController    = require("./app/controllers/paymentController");
const TicketController     = require("./app/controllers/ticketController");
const PriceController      = require("./app/controllers/priceController");
const SessionController    = require("./app/controllers/sessionController");
const MovieController      = require("./app/controllers/movieController");
const AuditoriumController = require("./app/controllers/auditoriumController");

mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://mongo/cinema");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || "8080";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({message: "It works!"});
});

// routes for User
router.route("/user")
  .post(UserController.create)
  .get(UserController.index);

router.route("/user/:id")
  .get(UserController.show)
  .put(UserController.update)
  .delete(UserController.destroy);

// routes for Payment
router.route("/payment")
  .post(PaymentController.create)
  .get(PaymentController.index);

router.route("/payment/:id")
  .get(PaymentController.show)
  .put(PaymentController.update);

router.route("/payment/:id/print")
  .get(PaymentController.print);

// routes for Ticket
router.route("/ticket")
  .post(TicketController.create)
  .get(TicketController.index);

router.route("/ticket/:id")
  .get(TicketController.show)
  .put(TicketController.update)
  .delete(TicketController.destroy);

// routes for Price
router.route("/price")
  .post(PriceController.create)
  .get(PriceController.index);

router.route("/price/:id")
  .get(PriceController.show)
  .put(PriceController.update)
  .delete(PriceController.destroy);

// routes for Session
router.route("/session")
  .post(SessionController.create)
  .get(SessionController.index);

router.route("/session/:id")
  .get(SessionController.show)
  .put(SessionController.update)
  .delete(SessionController.destroy);

// routes for Movie
router.route("/movie")
  .post(MovieController.create)
  .get(MovieController.index);

router.route("/movie/:id")
  .get(MovieController.show)
  .put(MovieController.update)
  .delete(MovieController.destroy);

// routes for Auditorium
router.route("/auditorium")
  .post(AuditoriumController.create)
  .get(AuditoriumController.index);

router.route("/auditorium/:id")
  .get(AuditoriumController.show)
  .put(AuditoriumController.update)
  .delete(AuditoriumController.destroy);

app.use("/api", router);

app.listen(port);
console.info("Started at port " + port);
