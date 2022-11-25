const fs = require("fs");
const nReadlines = require("n-readlines");
const airlinesSeed = new nReadlines("../seeders/airlines.csv");
const airportsSeed = new nReadlines("../seeders/airports.csv");
const flightsSeed = new nReadlines("../seeders/flights.csv");

const { Router } = require("express");
const db = require("../db");
require("dotenv").config();

const { Airline, Airport, Flight } = db;
const dbLoadRoute = Router();

const url = process.env.URL_BACK;

const csvToJson = require("../controllers/csvToJson");

dbLoadRoute.get("/", async (req, res, next) => {
  try {
    const testDB = await Airline.findAll();

    if (testDB.length === 0) {
      const airlineJsonProm = new Promise((resolve, reject) => {
        try {
          const res = csvToJson(airlinesSeed, []);
          resolve(res);
        } catch (error) {
          reject(Error(error));
        }
      });
      const airportJsonProm = new Promise((resolve, reject) => {
        try {
          const res = csvToJson(airportsSeed, []);
          resolve(res);
        } catch (error) {
          reject(Error(error));
        }
      });
      const flightsJsonProm = new Promise((resolve, reject) => {
        try {
          const res = csvToJson(flightsSeed, [
            "AIRLINE",
            "ORIGIN_AIRPORT",
            "DESTINATION_AIRPORT",
          ]);
          resolve(res);
        } catch (error) {
          reject(Error(error));
        }
      });

      const [airlineJson, airportJson, flightJson] = await Promise.all([
        airlineJsonProm,
        airportJsonProm,
        flightsJsonProm,
      ]);

      const [allAirlines, allAirports, allFlights] = [[], [], []];
      for (const obj of airlineJson) {
        allAirlines.push(Airline.create(obj));
      }
      for (const obj of airportJson) {
        allAirports.push(Airport.create(obj));
      }
      for (const obj of flightJson) {
        allFlights.push(Flight.create(obj));
      }

      const [allAirlinesProm, allAirportsProm, allFlightsProm] = [
        Promise.all(allAirlines),
        Promise.all(allAirports),
        Promise.all(allFlights),
      ];

      await Promise.all([allAirlinesProm, allAirportsProm, allFlightsProm]);
    }

    return res.send("Database filled!");
  } catch (error) {
    return next(error);
  }
});

module.exports = dbLoadRoute;
