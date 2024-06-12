const express = require('express');
const cors = require('cors');
require("dotenv").config();
const sequelize = require('./src/config/dbConnection');

// Database Connection
sequelize();

const server = express();
  
server.use(express.json());
server.use(cors());

// Server port
const port = process.env.SERVER_PORT;

server.listen(port, () => {
    console.log(`[server]: Running at http://localhost:${port}`);
})