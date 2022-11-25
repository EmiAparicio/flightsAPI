const { Model, DataTypes } = require("sequelize");

class Airline extends Model {
  static associate(models) {
    Airline.belongsTo(models.Flight);
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
