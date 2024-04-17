const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        roadAddress: {
            type: String,
            required: true,
        },
        parcelAddress: {
            type: String,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    category: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            type: String,
        },
    ],
    priceRange: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
    },
    openingHours: {
        type: String,
    },
    contact: {
        type: String,
    },
    website: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
