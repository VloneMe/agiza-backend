const express = require('express');
const router = express.Router();
const Transportation = require('../models/Transportation');
const verifyToken = require('../middlewares/auth');

// Create a new transportation record
router.post('/', verifyToken, async (req, res) => {
    try {
        const transportation = new Transportation({
            userId: req.body.userId,
            type: req.body.type,
            licensePlate: req.body.licensePlate,
            capacity: req.body.capacity,
            status: req.body.status
        });
        await transportation.save();
        res.status(201).json(transportation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all transportation records
router.get('/', verifyToken, async (req, res) => {
    try {
        const transportationRecords = await Transportation.find().populate('userId', 'username email');
        res.json(transportationRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read a single transportation record
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const transportation = await Transportation.findById(req.params.id).populate('userId', 'username email');
        if (!transportation) return res.status(404).json({ message: 'Transportation not found' });
        res.json(transportation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a transportation record
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const transportation = await Transportation.findById(req.params.id);
        if (!transportation) return res.status(404).json({ message: 'Transportation not found' });

        transportation.userId = req.body.userId || transportation.userId;
        transportation.type = req.body.type || transportation.type;
        transportation.licensePlate = req.body.licensePlate || transportation.licensePlate;
        transportation.capacity = req.body.capacity || transportation.capacity;
        transportation.status = req.body.status || transportation.status;
        transportation.updatedAt = Date.now();

        await transportation.save();
        res.json(transportation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a transportation record
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const transportation = await Transportation.findById(req.params.id);
        if (!transportation) return res.status(404).json({ message: 'Transportation not found' });

        await transportation.remove();
        res.json({ message: 'Transportation deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;