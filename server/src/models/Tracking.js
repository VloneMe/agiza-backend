const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');

class Tracking extends Model {}

Tracking.init({
  tracking_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  package_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status_update: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Tracking',
});

module.exports = Tracking;
