const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
    username: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phone: { 
        type: String, 
        required: true, 
        unique: true 
    },
    role: { 
        type: String, 
        enum: ['customer', 'courier', 'admin'], 
        default: 'customer', 
        required: true 
    },
    plateNumber: {
        type: String,
        required: function() {
            return this.role === 'courier';
        }
    },
    vehicleName: {
        type: String,
        required: function() {
            return this.role === 'courier';
        }
    },
    vehicleColor: {
        type: String,
        required: function() {
            return this.role === 'courier';
        }
    }
}, { timestamps: true });

// Export the user model
module.exports = mongoose.model('User', userSchema);