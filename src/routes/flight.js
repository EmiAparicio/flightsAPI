const { Router } = require("express");
const { sequelize } = require("../db");
const db = require("../db");
require("dotenv").config();

const { Flight } = db;
const flightRoute = Router();

// GET fetch to /flight to find all flights
// Add 'key' (ID, YEAR, MONTH, DAY, DAY_OF_WEEK, AIRLINE, FLIGHT_NUMBER, TAIL_NUMBER, ORIGIN_AIRPORT, DESTINATION_AIRPORT, SCHEDULED_DEPARTURE, DEPARTURE_TIME, DEPARTURE_DELAY, TAXI_OUT, WHEELS_OFF, SCHEDULED_TIME, ELAPSED_TIME, AIR_TIME, DISTANCE, WHEELS_ON, TAXI_IN, SCHEDULED_ARRIVAL, ARRIVAL_TIME, ARRIVAL_DELAY, DIVERTED, CANCELLED, CANCELLATION_REASON, AIR_SYSTEM_DELAY, SECURITY_DELAY, AIRLINE_DELAY, LATE_AIRCRAFT_DELAY, WEATHER_DELAY) and 'filter' query strings to get specific flights
flightRoute.get("/", async (req, res, next) => {
  try {
    const { key, filter } = req.query;

    if ((key && !filter) || (!key && filter))
      return res.status(400).send("Missing information: need key and filter");
    else if (!key && !filter) {
      const flights = await Flight.findAll();
      return res.status(200).json(flights);
    } else if (
      key.toUpperCase() === "ID" ||
      key.toUpperCase() === "YEAR" ||
      key.toUpperCase() === "MONTH" ||
      key.toUpperCase() === "DAY" ||
      key.toUpperCase() === "DAY_OF_WEEK" ||
      key.toUpperCase() === "FLIGHT_NUMBER" ||
      key.toUpperCase() === "TAIL_NUMBER" ||
      key.toUpperCase() === "SCHEDULED_DEPARTURE" ||
      key.toUpperCase() === "DEPARTURE_TIME" ||
      key.toUpperCase() === "DEPARTURE_DELAY" ||
      key.toUpperCase() === "TAXI_OUT" ||
      key.toUpperCase() === "WHEELS_OFF" ||
      key.toUpperCase() === "SCHEDULED_TIME" ||
      key.toUpperCase() === "ELAPSED_TIME" ||
      key.toUpperCase() === "AIR_TIME" ||
      key.toUpperCase() === "DISTANCE" ||
      key.toUpperCase() === "WHEELS_ON" ||
      key.toUpperCase() === "TAXI_IN" ||
      key.toUpperCase() === "SCHEDULED_ARRIVAL" ||
      key.toUpperCase() === "ARRIVAL_TIME" ||
      key.toUpperCase() === "ARRIVAL_DELAY" ||
      key.toUpperCase() === "DIVERTED" ||
      key.toUpperCase() === "CANCELLED" ||
      key.toUpperCase() === "CANCELLATION_REASON" ||
      key.toUpperCase() === "AIR_SYSTEM_DELAY" ||
      key.toUpperCase() === "SECURITY_DELAY" ||
      key.toUpperCase() === "AIRLINE_DELAY" ||
      key.toUpperCase() === "LATE_AIRCRAFT_DELAY" ||
      key.toUpperCase() === "WEATHER_DELAY" ||
      key.toUpperCase() === "AIRLINE" ||
      key.toUpperCase() === "DESTINATION_AIRPORT" ||
      key.toUpperCase() === "ORIGIN_AIRPORT"
    ) {
      const keyUpperCase = key.toUpperCase();
      const filterUpperCase = filter.toUpperCase();
      const flights = await Flight.findAll({
        where: {
          [keyUpperCase]: sequelize.where(
            sequelize.fn("UPPER", sequelize.col(keyUpperCase)),
            "LIKE",
            "%" + filterUpperCase + "%"
          ),
        },
      });
      return res.status(200).json(flights);
    } else return res.status(400).send("Invalid key");
  } catch (error) {
    return next(error);
  }
});

// Create new flight
flightRoute.post("/", async (req, res, next) => {
  try {
    const {
      YEAR,
      MONTH,
      DAY,
      DAY_OF_WEEK,
      AIRLINE,
      FLIGHT_NUMBER,
      TAIL_NUMBER,
      ORIGIN_AIRPORT,
      DESTINATION_AIRPORT,
      SCHEDULED_DEPARTURE,
      DEPARTURE_TIME,
      DEPARTURE_DELAY,
      TAXI_OUT,
      WHEELS_OFF,
      SCHEDULED_TIME,
      ELAPSED_TIME,
      AIR_TIME,
      DISTANCE,
      WHEELS_ON,
      TAXI_IN,
      SCHEDULED_ARRIVAL,
      ARRIVAL_TIME,
      ARRIVAL_DELAY,
      DIVERTED,
      CANCELLED,
      CANCELLATION_REASON,
      AIR_SYSTEM_DELAY,
      SECURITY_DELAY,
      AIRLINE_DELAY,
      LATE_AIRCRAFT_DELAY,
      WEATHER_DELAY,
    } = req.body;

    const flight = await Flight.create({
      YEAR,
      MONTH,
      DAY,
      DAY_OF_WEEK,
      AIRLINE,
      FLIGHT_NUMBER,
      TAIL_NUMBER,
      ORIGIN_AIRPORT,
      DESTINATION_AIRPORT,
      SCHEDULED_DEPARTURE,
      DEPARTURE_TIME,
      DEPARTURE_DELAY,
      TAXI_OUT,
      WHEELS_OFF,
      SCHEDULED_TIME,
      ELAPSED_TIME,
      AIR_TIME,
      DISTANCE,
      WHEELS_ON,
      TAXI_IN,
      SCHEDULED_ARRIVAL,
      ARRIVAL_TIME,
      ARRIVAL_DELAY,
      DIVERTED,
      CANCELLED,
      CANCELLATION_REASON,
      AIR_SYSTEM_DELAY,
      SECURITY_DELAY,
      AIRLINE_DELAY,
      LATE_AIRCRAFT_DELAY,
      WEATHER_DELAY,
    });

    return res.status(200).json(flight);
  } catch (error) {
    return next(error);
  }
});

// Delete a single column by its (ID, YEAR, FLIGHT_NUMBER, AIRLINE, DESTINATION_AIRPORT, ORIGIN_AIRPORT) through body
// Or delete the whole table by sending no body data
flightRoute.delete("/", async (req, res, next) => {
  try {
    const resp = await Flight.destroy({
      where: req.body,
    });

    return res.status(200).json(resp);
  } catch (error) {
    return next(error);
  }
});

// Modify the entry of primary key "ID"
// Send properties to modify via request body
flightRoute.put("/", async (req, res, next) => {
  try {
    const { ID } = req.body;

    if (!ID) return res.status(400).send("Bad request: missing flight ID");

    const flight = await Flight.update(req.body, {
      where: { ID },
    });

    return res.status(200).json(flight);
  } catch (error) {
    return next(error);
  }
});

module.exports = flightRoute;
