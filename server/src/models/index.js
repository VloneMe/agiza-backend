const sequelize = require('../config/dbConnection');
const User = require('./User');
const Address = require('./Address');
const Package = require('./Package');
const Delivery = require('./Delivery');
const Courier = require('./Courier');
const Tracking = require('./Tracking');
const Rating = require('./Rating');

// Associations
User.hasMany(Address, { foreignKey: 'user_id' });
User.hasMany(Package, { as: 'Sender', foreignKey: 'sender_id' });
User.hasMany(Package, { as: 'Recipient', foreignKey: 'recipient_id' });
User.hasMany(Rating, { foreignKey: 'user_id' });

Address.belongsTo(User, { foreignKey: 'user_id' });

Package.belongsTo(User, { as: 'Sender', foreignKey: 'sender_id' });
Package.belongsTo(User, { as: 'Recipient', foreignKey: 'recipient_id' });
Package.hasOne(Delivery, { foreignKey: 'package_id' });
Package.hasMany(Tracking, { foreignKey: 'package_id' });

Delivery.belongsTo(Package, { foreignKey: 'package_id' });
Delivery.belongsTo(Courier, { foreignKey: 'courier_id' });

Courier.hasMany(Delivery, { foreignKey: 'courier_id' });
Courier.hasMany(Rating, { foreignKey: 'courier_id' });

Tracking.belongsTo(Package, { foreignKey: 'package_id' });

Rating.belongsTo(Courier, { foreignKey: 'courier_id' });
Rating.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Address,
  Package,
  Delivery,
  Courier,
  Tracking,
  Rating,
};
