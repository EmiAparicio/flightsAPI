const { Model, DataTypes } = require("sequelize");

class Airport extends Model {
  static associate(models) {
    Airport.hasMany(models.Flight, {
      foreignKey: "DESTINATION_AIRPORT",
      foreignKeyConstraint: true,
    });
    Airport.hasMany(models.Flight, {
      foreignKey: "ORIGIN_AIRPORT",
      foreignKeyConstraint: true,
    });
  }
}

module.exports = (sequelize) => {
  Airport.init(
    {
      IATA_CODE: {
        type: DataTypes.STRING(3),
        primaryKey: true,
      },
      AIRPORT: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CITY: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      STATE: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      COUNTRY: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      LATITUDE: {
        type: DataTypes.FLOAT,
      },
      LONGITUDE: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "Airport",
    }
  );
  return Airport;
};
