const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const DBconnection = require('./src/config/db')
const verifyToken = require('./src/middlewares/auth');
require('dotenv').config();


const server = express();

server.use(express.json());
server.use(cors());

// db connection
DBconnection();

server.use('/api/users', require('./src/routes/userRoutes'));
server.use('/api/packages',  require('./src/routes/packageRoutes'));
server.use('/api/addresses',  require('./src/routes/addressRoutes'));
server.use('/api/transportation',  require('./src/routes/transportationRoutes'));

// Error handling middleware
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 3000;
const HOST = '192.168.58.127';
server.listen(PORT, HOST, () => {
    console.log(`[Server]: is running on port http://${HOST}:${PORT}`);
});