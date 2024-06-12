const { Sequelize } = require('sequelize');

const sequelize = () => {
    const db = new Sequelize('postgres', 'postgres', 'admin', {
        host: 'localhost',
        dialect: 'postgres'
    });

    db.authenticate()
      .then(() =>  console.log(`[server]: Database connected...!`))
      .catch(err => console.log("[server: Error]: " + err));
};

module.exports = sequelize;