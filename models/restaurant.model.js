const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
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
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
