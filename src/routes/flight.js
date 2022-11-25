const { Router } = require("express");
const db = require("../db");
require("dotenv").config();

const { Flight } = db;
const flightRoute = Router();

const url = process.env.URL_BACK || "http://localhost:3000";

module.exports = flightRoute;
