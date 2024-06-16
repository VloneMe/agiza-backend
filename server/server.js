const express = require('express');
const mongoose = require('mongoose');
const DBconnection = require('./src/config/db')
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const packageRoutes = require('./src/routes/packageRoutes');
const addressRoutes = require('./src/routes/addressRoutes');
const transportationRoutes = require('./src/routes/transportationRoutes');
const verifyToken = require('./src/middlewares/auth');

app.use(express.json());
require('dotenv').config();

// db connection
DBconnection();

app.use('/api/users', userRoutes);
app.use('/api/packages', verifyToken, packageRoutes);
app.use('/api/addresses', verifyToken, addressRoutes);
app.use('/api/transportation', verifyToken, transportationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 3000;
const HOST = '192.168.1.164';
app.listen(PORT, HOST, () => {
    console.log(`[Server]: is running on port http://${HOST}:${PORT}`);
});