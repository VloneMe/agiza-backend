const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-transit', 'delivered', 'cancelled'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Package', packageSchema);