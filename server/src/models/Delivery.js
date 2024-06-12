const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');

class Delivery extends Model {}

Delivery.init({
  delivery_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  package_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  delivery_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  delivery_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  courier_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  pickup_address_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  dropoff_address_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Delivery',
});

module.exports = Delivery;
