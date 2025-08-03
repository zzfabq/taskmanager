const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        unique: true // Ensures one owner per user
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
ownerSchema.index({ userId: 1 });

// Virtual to populate user details
ownerSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

// Ensure virtual fields are serialized
ownerSchema.set('toJSON', { virtuals: true });
ownerSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Owner', ownerSchema);
