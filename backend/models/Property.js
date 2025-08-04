const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    ownerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Owner', 
        required: true 
    },
    title: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String,
        trim: true
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, default: 'Australia' }
    },
    propertyType: {
        type: String,
        enum: ['apartment', 'house', 'condo', 'townhouse', 'studio', 'other'],
        required: true
    },
    bedrooms: { 
        type: Number, 
        min: 0,
        default: 1
    },
    bathrooms: { 
        type: Number, 
        min: 0,
        default: 1
    },
    size: {
        value: { type: Number, min: 0 },
        unit: { type: String, enum: ['sqm', 'sqft'], default: 'sqm' }
    },
    rent: {
        amount: { type: Number, min: 0 },
        period: { type: String, enum: ['weekly', 'monthly', 'yearly'], default: 'monthly' }
    },
    status: {
        type: String,
        enum: ['available', 'occupied', 'maintenance', 'unavailable'],
        default: 'available'
    },
    amenities: [{ type: String }],
    images: [{ type: String }], // URLs to property images
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

// Add indexes for better query performance
propertySchema.index({ ownerId: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ propertyType: 1 });
propertySchema.index({ 'address.city': 1 });

// Virtual for full address
propertySchema.virtual('fullAddress').get(function() {
    return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}`;
});

// Ensure virtual fields are serialized
propertySchema.set('toJSON', { virtuals: true });
propertySchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Property', propertySchema);
