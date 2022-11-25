const { Router } = require("express");
const airlineRoute = require("./airline");
const airportRoute = require("./airport");
const flightRoute = require("./flight");
const dbLoadRoute = require("./db-loader");

const router = Router();

router.use("/airline", airlineRoute);
router.use("/airport", airportRoute);
router.use("/flight", flightRoute);
router.use("/dbload", dbLoadRoute);

module.exports = router;
