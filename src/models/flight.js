const { Model, DataTypes } = require("sequelize");

class Flight extends Model {
  static associate(models) {
    Flight.belongsTo(models.Airport, {
      foreignKey: "DESTINATION_AIRPORT",
      foreignKeyConstraint: true,
    });
    Flight.belongsTo(models.Airport, {
      foreignKey: "ORIGIN_AIRPORT",
      foreignKeyConstraint: true,
    });
    Flight.belongsTo(models.Airline, {
      foreignKey: "AIRLINE",
      foreignKeyConstraint: true,
    });
  }
}

module.exports = (sequelize) => {
  Flight.init(
    {
      ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      YEAR: { type: DataTypes.INTEGER },
      MONTH: { type: DataTypes.INTEGER },
      DAY: { type: DataTypes.INTEGER },
      DAY_OF_WEEK: { type: DataTypes.INTEGER },
      FLIGHT_NUMBER: {
        type: DataTypes.INTEGER,
      },
      TAIL_NUMBER: {
        type: DataTypes.STRING,
      },
      SCHEDULED_DEPARTURE: { type: DataTypes.INTEGER },
      DEPARTURE_TIME: { type: DataTypes.INTEGER },
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
      CANCELLATION_REASON: { type: DataTypes.STRING },
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
