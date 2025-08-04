const mongoose = require('mongoose');

const renterSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        unique: true // Ensures one renter per user
    },
    // Remove name and email duplication - get from User reference
    phone: { 
        type: String,
        match: [/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number']
    },
    address: { type: String },
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
}, {
    timestamps: true,
});

// Add compound index for better query performance
renterSchema.index({ userId: 1 });

// Virtual to populate user details
renterSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

// Ensure virtual fields are serialized
renterSchema.set('toJSON', { virtuals: true });
renterSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Renter', renterSchema);
