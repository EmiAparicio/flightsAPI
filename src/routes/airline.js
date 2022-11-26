const { Router } = require("express");
const db = require("../db");
require("dotenv").config();

const { Airline } = db;
const airlineRoute = Router();

module.exports = airlineRoute;
