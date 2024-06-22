const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require("../middlewares/auth");

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, password, email, phone, role, plateNumber, vehicleName, vehicleColor } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Construct user object with conditional fields for couriers
        const user = new User({ 
            username, 
            password: hashedPassword,
            email, 
            phone, 
            role,
            plateNumber: role === 'courier' ? plateNumber : undefined,
            vehicleName: role === 'courier' ? vehicleName : undefined,
            vehicleColor: role === 'courier' ? vehicleColor : undefined
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Verify token
router.get('/verify', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
        res.status(200).json({ message: 'Token is valid', user: decoded });
    });
});

// Read all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read a single user
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a user
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { username, email, role, plateNumber, vehicleName, vehicleColor } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.username = username || user.username;
        user.email = email || user.email;
        user.role = role || user.role;
        user.plateNumber = role === 'courier' ? plateNumber : user.plateNumber;
        user.vehicleName = role === 'courier' ? vehicleName : user.vehicleName;
        user.vehicleColor = role === 'courier' ? vehicleColor : user.vehicleColor;
        user.updatedAt = Date.now();

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a user
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.remove();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;