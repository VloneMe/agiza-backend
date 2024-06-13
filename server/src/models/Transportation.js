const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transportationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    licensePlate: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    status: { type: String, enum: ['available', 'in-use', 'maintenance'], default: 'available' },
}, { timestamps: true });

module.exports = mongoose.model('Transportation', transportationSchema);