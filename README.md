![WannabeLogo](wannabelogo.svg)

# Technical Challenge: Backend Software Engineering

## Challenge

For this challenge, an API on Node.js that allows you to create, update, delete and get the data about airports, airlines, and flights (from .csv files) integrated with a PostgreSQL database must be developed.

### Stack

<PostgreSQL (Sequelize) - Express - NodeJS> JavaScript Stack was chosen as it's one of the most used ones related to requested technologies.

### GitHub Repository: [flightsAPI](https://github.com/NoahReaver/flightsAPI)

---

# API

## Settings

1. Save `airlines`, `airports` and `flights` .csv data files into `src/seeders` folder
2. Create `.env` file with:

```
PORT = 3001
PGPORT = // postgres port
DB_NAME = // database name
DB_USER = // postgres user
DB_PASSWORD = // postgres password
DB_HOST = // localhost or another
```

3. In order to populate the database, hit the `/dbload` endpoint with a GET request

```
The src/controllers/fillDB.js file has a `return` statement in line 33 that must be commented in order to use the `bundle` variable not to be a limit of the amount of lines that will be loaded.

Comment line 33 and modify the function's last argument in src/routes/db-loader.js (lines 32, 33, 34) to manipulate memory usage while loading big data files, such as flights.csv.
```

---

## Consuming the API (CRUD)

---

### Create: POST method

**[ ] Airports** endpoint: https://backURL/airport

- Create a new airport: hit the endpoint sending a request body with the airport information (required: "IATA_CODE", "AIRPORT", "CITY", "STATE", "COUNTRY"; optional: "LATITUDE", "LONGITUDE")

**[ ] Airlines** endpoint: https://backURL/airline

- Create a new airline: hit the endpoint sending a request body with the airport information (required: "IATA_CODE", "AIRLINE")

**[ ] Flights** endpoint: https://backURL/flight

- Create a new airline: hit the endpoint sending a request body with the airport information

---

### Read: GET method

**[ ] Airports** endpoint: https://backURL/airport

- Get all airports: hit the endpoint as it is
- Get specific airport:

  - Add two query strings (`key` and `filter`) to the endpoint: https://backURL/airport?key=ANYKEY&filter=ANYFILTER
    - `ANYKEY` must be any of these: "IATA_CODE", "AIRPORT", "CITY", "STATE", "COUNTRY"
    - `ANYFILTER` is the encoded string used as a filter

- Data structure example:

```
{
    "IATA_CODE": "ABE",
    "AIRPORT": "Lehigh Valley International Airport",
    "CITY": "Allentown",
    "STATE": "PA",
    "COUNTRY": "USA",
    "LATITUDE": 40.65236,
    "LONGITUDE": -75.4404,
    "createdAt": "2022-11-26T17:11:11.429Z",
    "updatedAt": "2022-11-26T17:11:11.429Z"
}
```

**[ ] Airlines** endpoint: https://backURL/airline

- Get all airlines: hit the endpoint as it is
- Get specific airline:

  - Add two query strings (`key` and `filter`) to the endpoint: https://backURL/airline?key=ANYKEY&filter=ANYFILTER
    - `ANYKEY` must be any of these: "IATA_CODE", "AIRLINE"
    - `ANYFILTER` is the encoded string used as a filter

- Data structure example:

```
{
    "IATA_CODE": "UA",
    "AIRLINE": "United Air Lines Inc.",
    "createdAt": "2022-11-26T17:11:11.424Z",
    "updatedAt": "2022-11-26T17:11:11.424Z"
}
```

**[ ] Flights** endpoint: https://backURL/flight

- Get all flights: hit the endpoint as it is
- Get specific flight:

  - Add two query strings (`key` and `filter`) to the endpoint: https://backURL/flight?key=ANYKEY&filter=ANYFILTER
    - `ANYKEY` must be any of these: "ID", "YEAR", "MONTH", "DAY", "DAY_OF_WEEK", "AIRLINE", "FLIGHT_NUMBER", "TAIL_NUMBER", "ORIGIN_AIRPORT", "DESTINATION_AIRPORT", "SCHEDULED_DEPARTURE", "DEPARTURE_TIME", "DEPARTURE_DELAY", "TAXI_OUT", "WHEELS_OFF", "SCHEDULED_TIME", "ELAPSED_TIME", "AIR_TIME", "DISTANCE", "WHEELS_ON", "TAXI_IN", "SCHEDULED_ARRIVAL", "ARRIVAL_TIME", "ARRIVAL_DELAY", "DIVERTED", "CANCELLED", "CANCELLATION_REASON", "AIR_SYSTEM_DELAY", "SECURITY_DELAY", "AIRLINE_DELAY", "LATE_AIRCRAFT_DELAY", "WEATHER_DELAY"
    - `ANYFILTER` is the encoded string used as a filter

- Data structure example:

```
{
    "ID": 1,
    "YEAR": 2015,
    "MONTH": 1,
    "DAY": 1,
    "DAY_OF_WEEK": 4,
    "FLIGHT_NUMBER": 98,
    "TAIL_NUMBER": "N407AS",
    "SCHEDULED_DEPARTURE": 5,
    "DEPARTURE_TIME": 2354,
    "DEPARTURE_DELAY": -11,
    "TAXI_OUT": 21,
    "WHEELS_OFF": 15,
    "SCHEDULED_TIME": 205,
    "ELAPSED_TIME": 194,
    "AIR_TIME": 169,
    "DISTANCE": 1448,
    "WHEELS_ON": 404,
    "TAXI_IN": 4,
    "SCHEDULED_ARRIVAL": 430,
    "ARRIVAL_TIME": 408,
    "ARRIVAL_DELAY": -22,
    "DIVERTED": 0,
    "CANCELLED": 0,
    "CANCELLATION_REASON": "0",
    "AIR_SYSTEM_DELAY": 0,
    "SECURITY_DELAY": 0,
    "AIRLINE_DELAY": 0,
    "LATE_AIRCRAFT_DELAY": 0,
    "WEATHER_DELAY": 0,
    "createdAt": "2022-11-26T17:11:11.492Z",
    "updatedAt": "2022-11-26T17:11:11.492Z",
    "AIRLINE": "AS",
    "DESTINATION_AIRPORT": "SEA",
    "ORIGIN_AIRPORT": "ANC"
}
```

---

### Update: PUT method

**[ ] Airports** endpoint: https://backURL/airport

- Modify an airport: hit the endpoint sending a request body which includes the current IATA code as "curIATA_CODE" and any of the other properties to update as "IATA_CODE", "AIRPORT", "CITY", "STATE", "COUNTRY", "LATITUDE", "LONGITUDE"

- Example of IATA_CODE updating:

```
Request body
{
  "curIATA_CODE": "ABE",
  "IATA_CODE": "ABB"
}
```

**[ ] Airlines** endpoint: https://backURL/airline

- Modify an airline: hit the endpoint sending a request body which includes the current IATA code as "curIATA_CODE" and any of the other properties to update as "IATA_CODE", "AIRLINE"

**[ ] Flights** endpoint: https://backURL/flight

- Modify a flight: hit the endpoint sending a request body which includes the flight id as "ID" and any of the other properties to update

---

### Delete: DELETE method

**[ ] Airports** endpoint: https://backURL/airport

- Delete the whole table: hit the endpoint as it is
- Delete airport of specific IATA code: hit the endpoint adding a query string https://backURL/airport?IATA_CODE=ANYCODE

**[ ] Airlines** endpoint: https://backURL/airline

- Delete the whole table: hit the endpoint as it is
- Delete airline of specific IATA code: hit the endpoint adding a query string https://backURL/airline?IATA_CODE=ANYCODE

**[ ] Flights** endpoint: https://backURL/flight

- Delete the whole table: hit the endpoint as it is
- Delete flight of specific id: hit the endpoint sending a request body including the flight ID

  - Example of specific flight deleting:

```
Request body
{
  "ID": 1
}
```
