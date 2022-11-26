const { Router } = require("express");
const db = require("../db");
require("dotenv").config();

const { Airport } = db;
const airportRoute = Router();

// GET fetch to /airport to find all airports
// Add 'key' ("IATA_CODE", "STATE", or "COUNTRY") and 'filter' query strings to get specific airports
airportRoute.get("/", async (req, res, next) => {
  try {
    const { key, filter } = req.query;

    if ((key && !filter) || (!key && filter))
      return res.status(400).send("Missing information: need key and filter");
    else if (!key && !filter) {
      const airports = await Airport.findAll();
      return res.status(200).json(airports);
    } else if (
      key.toUpperCase() === "IATA_CODE" ||
      key.toUpperCase() === "STATE" ||
      key.toUpperCase() === "COUNTRY"
    ) {
      const airports = await Airport.findAll({
        where: {
          [key.toUpperCase()]: filter.toUpperCase(),
        },
      });
      return res.status(200).json(airports);
    } else return res.status(400).send("Invalid key");
  } catch (error) {
    return next(error);
  }
});

// Create new airport
// must include "IATA_CODE", "AIRPORT", "CITY", "STATE", "COUNTRY" data in request body
airportRoute.post("/", async (req, res, next) => {
  try {
    const { IATA_CODE, AIRPORT, CITY, STATE, COUNTRY, LATITUDE, LONGITUDE } =
      req.body;

    if (!IATA_CODE || !AIRPORT || !CITY || !STATE || !COUNTRY)
      return res.status(400).send("Bad request: missing data");

    if (
      (isNaN(LATITUDE) ||
        isNaN(LONGITUDE) ||
        isNaN(Number(LATITUDE)) ||
        isNaN(Number(LONGITUDE))) &&
      LATITUDE !== null &&
      LONGITUDE !== null &&
      LATITUDE !== undefined &&
      LONGITUDE !== undefined
    )
      return res.status(400).send("Bad request: LAT and LON must be numbers");

    const airport = await Airport.create({
      IATA_CODE,
      AIRPORT,
      CITY,
      STATE,
      COUNTRY,
      LATITUDE,
      LONGITUDE,
    });

    return res.status(200).json(airport);
  } catch (error) {
    return next(error);
  }
});

// Delete a single column by its IATA_CODE as query string
// or delete the whole table sending no query
airportRoute.delete("/", async (req, res, next) => {
  try {
    const { IATA_CODE } = req.query;
    let resp;

    if (IATA_CODE)
      resp = await Airport.destroy({
        where: {
          IATA_CODE: IATA_CODE.toUpperCase(),
        },
      });
    else
      resp = await Airport.destroy({
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
airportRoute.put("/", async (req, res, next) => {
  try {
    const {
      curIATA_CODE,
      IATA_CODE,
      AIRPORT,
      CITY,
      STATE,
      COUNTRY,
      LATITUDE,
      LONGITUDE,
    } = req.body;

    if (!curIATA_CODE)
      return res.status(400).send("Bad request: missing current IATA CODE");

    if (
      (isNaN(LATITUDE) ||
        isNaN(LONGITUDE) ||
        isNaN(Number(LATITUDE)) ||
        isNaN(Number(LONGITUDE))) &&
      LATITUDE !== null &&
      LONGITUDE !== null &&
      LATITUDE !== undefined &&
      LONGITUDE !== undefined
    )
      return res.status(400).send("Bad request: LAT and LON must be numbers");

    const newAirport = {};

    if (IATA_CODE) {
      const repeatedAirport = await Airport.findOne({
        where: { IATA_CODE: IATA_CODE.toUpperCase() },
      });
      if (repeatedAirport)
        return res
          .status(400)
          .send(`IATA_CODE ${IATA_CODE.toUpperCase()} already exists`);
      else newAirport.IATA_CODE = IATA_CODE.toUpperCase();
    }
    if (AIRPORT) newAirport.AIRPORT = AIRPORT;
    if (CITY) newAirport.CITY = CITY;
    if (STATE) newAirport.STATE = STATE.toUpperCase();
    if (COUNTRY) newAirport.COUNTRY = COUNTRY.toUpperCase();
    if (LATITUDE) newAirport.LATITUDE = LATITUDE;
    if (LONGITUDE) newAirport.LONGITUDE = LONGITUDE;

    const airport = await Airport.update(newAirport, {
      where: { IATA_CODE: curIATA_CODE.toUpperCase() },
    });

    return res.status(200).json(airport);
  } catch (error) {
    return next(error);
  }
});

module.exports = airportRoute;
