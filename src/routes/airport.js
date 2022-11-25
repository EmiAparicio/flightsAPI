const { Router } = require("express");
const db = require("../db");
require("dotenv").config();

const { Airport } = db;
const airportRoute = Router();

const url = process.env.URL_BACK;

module.exports = airportRoute;
