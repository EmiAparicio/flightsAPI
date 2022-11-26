const { Router } = require("express");
const dbLoadRoute = require("./db-loader");
const airlineRoute = require("./airline");
const airportRoute = require("./airport");
const flightRoute = require("./flight");

const router = Router();

router.use("/dbload", dbLoadRoute);
router.use("/airline", airlineRoute);
router.use("/airport", airportRoute);
router.use("/flight", flightRoute);

module.exports = router;
