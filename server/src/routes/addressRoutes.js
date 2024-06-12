const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const verifyToken = require('../middlewares/auth');

// Create a new address
router.post('/', verifyToken, async (req, res) => {
    try {
        const address = new Address(req.body);
        await address.save();
        res.status(201).json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all addresses
router.get('/', verifyToken, async (req, res) => {
    try {
        const addresses = await Address.find();
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read a single address
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) return res.status(404).json({ message: 'Address not found' });
        res.json(address);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an address
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) return res.status(404).json({ message: 'Address not found' });

        address.addressLine1 = req.body.addressLine1 || address.addressLine1;
        address.addressLine2 = req.body.addressLine2 || address.addressLine2;
        address.city = req.body.city || address.city;
        address.state = req.body.state || address.state;
        address.zipCode = req.body.zipCode || address.zipCode;
        address.country = req.body.country || address.country;
        address.updatedAt = Date.now();

        await address.save();
        res.json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an address
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) return res.status(404).json({ message: 'Address not found' });

        await address.remove();
        res.json({ message: 'Address deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;