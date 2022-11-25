const { Router } = require("express");
const airlineRoute = require("./airline");
const airportRoute = require("./airport");
const flightRoute = require("./flight");

const router = Router();

router.use("/airline", airlineRoute);
router.use("/logairportin", airportRoute);
router.use("/flight", flightRoute);

module.exports = router;
