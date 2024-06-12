const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const verifyToken = require('../middlewares/auth');

// Create a new package
router.post('/', verifyToken, async (req, res) => {
    try {
        const package = new Package(req.body);
        await package.save();
        res.status(201).json(package);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all packages
router.get('/', verifyToken, async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read a single package
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (!package) return res.status(404).json({ message: 'Package not found' });
        res.json(package);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a package
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (!package) return res.status(404).json({ message: 'Package not found' });

        package.senderId = req.body.senderId || package.senderId;
        package.recipientId = req.body.recipientId || package.recipientId;
        package.pickupAddress = req.body.pickupAddress || package.pickupAddress;
        package.deliveryAddress = req.body.deliveryAddress || package.deliveryAddress;
        package.status = req.body.status || package.status;
        package.updatedAt = Date.now();

        await package.save();
        res.json(package);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a package
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (!package) return res.status(404).json({ message: 'Package not found' });

        await package.remove();
        res.json({ message: 'Package deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;