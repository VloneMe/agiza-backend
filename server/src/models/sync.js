const { sequelize } = require('./models');

sequelize.sync({ force: true }).then(() => {
  console.log('[server]: Database synchronized');
}).catch(error => {
  console.error('[server]: Error synchronizing the database:', error);
});