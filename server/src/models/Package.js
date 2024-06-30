const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    pickuplocation: { type: String, required: true },
    deliverylocation: { type: String, required: true },
    fullName: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    Detail: { type: String, required: true },
    Inside: { type: String, required: true },
    rideType: { type: String, enum: ['bodaboda', 'kirikuu'], required: true },
    cost: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'in-transit', 'delivered', 'cancelled'], required: false, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const packageSchema = new Schema({
//     senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     pickupAddress: { type: String, required: true },
//     deliveryAddress: { type: String, required: true },
//     status: { type: String, enum: ['pending', 'in-transit', 'delivered', 'cancelled'], required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Package', packageSchema);
