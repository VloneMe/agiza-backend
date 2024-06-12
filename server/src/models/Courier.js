const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');

class Courier extends Model {}

Courier.init({
  courier_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicle_info: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Courier',
});

module.exports = Courier;
