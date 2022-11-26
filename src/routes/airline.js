const { Router } = require("express");
const db = require("../db");
require("dotenv").config();

const { Airline } = db;
const airlineRoute = Router();

// GET fetch to /airline to find all airlines
// Add 'key' ("IATA_CODE" or "AIRLINE") and 'filter' query strings to get specific airlines
airlineRoute.get("/", async (req, res, next) => {
  try {
    const { key, filter } = req.query;

    if ((key && !filter) || (!key && filter))
      return res.status(400).send("Missing information: need key and filter");
    else if (!key && !filter) {
      const airlines = await Airline.findAll();
      return res.status(200).json(airlines);
    } else if (
      key.toUpperCase() === "IATA_CODE" ||
      key.toUpperCase() === "AIRLINE"
    ) {
      const airlines = await Airline.findAll({
        where: {
          [key.toUpperCase()]: filter.toUpperCase(),
        },
      });
      return res.status(200).json(airlines);
    } else return res.status(400).send("Invalid key");
  } catch (error) {
    return next(error);
  }
});

// Create new airline
// must include "IATA_CODE", "AIRLINE", "CITY", "STATE", "COUNTRY" data in request body
airlineRoute.post("/", async (req, res, next) => {
  try {
    const { IATA_CODE, AIRLINE } = req.body;

    if (!IATA_CODE || !AIRLINE)
      return res.status(400).send("Bad request: missing data");

    const airline = await Airline.create({
      IATA_CODE,
      AIRLINE,
    });

    return res.status(200).json(airline);
  } catch (error) {
    return next(error);
  }
});

// Delete a single column by its IATA_CODE as query string
// or delete the whole table sending no query
airlineRoute.delete("/", async (req, res, next) => {
  try {
    const { IATA_CODE } = req.query;
    let resp;

    if (IATA_CODE)
      resp = await Airline.destroy({
        where: {
          IATA_CODE: IATA_CODE.toUpperCase(),
        },
      });
    else
      resp = await Airline.destroy({
        where: {},
        truncate: true,
        cascade: true,
        force: true,
      });

    return res.status(200).json(resp);
  } catch (error) {
    return next(error);
  }
});

// Modify the entry of primary key "curIATA_CODE"
// Send properties to modify via request body
airlineRoute.put("/", async (req, res, next) => {
  try {
    const { curIATA_CODE, IATA_CODE, AIRLINE } = req.body;

    if (!curIATA_CODE)
      return res.status(400).send("Bad request: missing current IATA CODE");

    const newAirline = {};

    if (IATA_CODE) {
      const repeatedAirline = await Airline.findOne({
        where: { IATA_CODE: IATA_CODE.toUpperCase() },
      });
      if (repeatedAirline)
        return res
          .status(400)
          .send(`IATA_CODE ${IATA_CODE.toUpperCase()} already exists`);
      else newAirline.IATA_CODE = IATA_CODE.toUpperCase();
    }
    if (AIRLINE) newAirline.AIRLINE = AIRLINE;

    const airline = await Airline.update(newAirline, {
      where: { IATA_CODE: curIATA_CODE.toUpperCase() },
    });

    return res.status(200).json(airline);
  } catch (error) {
    return next(error);
  }
});

module.exports = airlineRoute;
