const { Router } = require("express");
const db = require("../db");
require("dotenv").config();

const { Airline, Airport, Flight } = db;
const dbLoadRoute = Router();

const url = process.env.URL_BACK;

dbLoadRoute.get("/", async (req, res, next) => {
  try {
    return res.send("ok");
  } catch (error) {
    return next(error);
  }
});

module.exports = dbLoadRoute;
