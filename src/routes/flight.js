const { Router } = require("express");
const db = require("../db");
require("dotenv").config();

const { Flight } = db;
const flightRoute = Router();

module.exports = flightRoute;
