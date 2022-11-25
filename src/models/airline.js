const { Model, DataTypes } = require("sequelize");

class Airline extends Model {
  static associate(models) {
    Airline.hasMany(models.Flight, {
      foreignKey: "AIRLINE",
      foreignKeyConstraint: true,
    });
  }
}

module.exports = (sequelize) => {
  Airline.init(
    {
      IATA_CODE: {
        type: DataTypes.STRING(2),
        primaryKey: true,
      },
      AIRLINE: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Airline",
    }
  );
  return Airline;
};
