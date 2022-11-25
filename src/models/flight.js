const { Model, DataTypes } = require("sequelize");

class Flight extends Model {
  static associate(models) {
    Flight.belongsToMany(models.Airport, { through: "DESTINATION_AIRPORT" });
    Flight.belongsToMany(models.Airport, { through: "ORIGIN_AIRPORT" });
    Flight.hasOne(models.Airline);
  }
}

module.exports = (sequelize) => {
  Flight.init(
    {
      YEAR: { type: DataTypes.INTEGER },
      MONTH: { type: DataTypes.INTEGER },
      DAY: { type: DataTypes.INTEGER },
      DAY_OF_WEEK: { type: DataTypes.INTEGER },
      FLIGHT_NUMBER: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      TAIL_NUMBER: {
        type: DataTypes.STRING,
      },
      SCHEDULED_DEPARTURE,
      DEPARTURE_TIME,
      DEPARTURE_DELAY: { type: DataTypes.INTEGER },
      TAXI_OUT: { type: DataTypes.INTEGER },
      WHEELS_OFF: { type: DataTypes.INTEGER },
      SCHEDULED_TIME: { type: DataTypes.INTEGER },
      ELAPSED_TIME: { type: DataTypes.INTEGER },
      AIR_TIME: { type: DataTypes.INTEGER },
      DISTANCE: { type: DataTypes.INTEGER },
      WHEELS_ON: { type: DataTypes.INTEGER },
      TAXI_IN: { type: DataTypes.INTEGER },
      SCHEDULED_ARRIVAL: { type: DataTypes.INTEGER },
      ARRIVAL_TIME: { type: DataTypes.INTEGER },
      ARRIVAL_DELAY: { type: DataTypes.INTEGER },
      DIVERTED: { type: DataTypes.INTEGER },
      CANCELLED: { type: DataTypes.INTEGER },
      CANCELLATION_REASON: { type: DataTypes.INTEGER },
      AIR_SYSTEM_DELAY: { type: DataTypes.INTEGER },
      SECURITY_DELAY: { type: DataTypes.INTEGER },
      AIRLINE_DELAY: { type: DataTypes.INTEGER },
      LATE_AIRCRAFT_DELAY: { type: DataTypes.INTEGER },
      WEATHER_DELAY: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "Flight",
    }
  );
  return Flight;
};
