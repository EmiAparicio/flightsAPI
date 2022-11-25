const { Router } = require("express");
const db = require("../db");
require("dotenv").config();

const { Airline } = db;
const airlineRoute = Router();

const url = process.env.URL_BACK;

module.exports = airlineRoute;
