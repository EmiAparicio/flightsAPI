const { Router } = require("express");
const db = require("../db");
require("dotenv").config();

const { Flight } = db;
const flightRoute = Router();

const url = process.env.URL_BACK;

module.exports = flightRoute;
