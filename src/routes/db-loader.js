const fs = require("fs");
const path = require("path");
const nReadlines = require("n-readlines");
const airlinesSeed = new nReadlines(
  path.join(__dirname.replace("routes", "seeders"), "airlines.csv")
);
const airportsSeed = new nReadlines(
  path.join(__dirname.replace("routes", "seeders"), "airports.csv")
);
const flightsSeed = new nReadlines(
  path.join(__dirname.replace("routes", "seeders"), "flights.csv")
);

const { Router } = require("express");
const db = require("../db");
require("dotenv").config();

const { Airline, Airport, Flight } = db;
const dbLoadRoute = Router();

const fillDB = require("../controllers/fillDB");

dbLoadRoute.get("/", async (req, res, next) => {
  try {
    const testDB = await Airline.findAll();

    if (testDB.length === 0) {
      // Args:
      // 1: nReadlines instance
      // 2: database model
      // 3: bundle of lines to load at once (watch for memory)
      await fillDB(airlinesSeed, Airline, 500);
      await fillDB(airportsSeed, Airport, 500);
      await fillDB(flightsSeed, Flight, 10);
    }

    return res.send("Database filled!");
  } catch (error) {
    return next(error);
  }
});

module.exports = dbLoadRoute;
