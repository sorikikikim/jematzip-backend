const restaurantModel = require('../models/restaurant.model');

async function createRestaurant(req, rest, next) {
    try {
        const createRestaurant = await restaurantModel.create(req.body);
        rest.status(201).json(createRestaurant);
    } catch (error) {
        next(error);
    }
}

async function getRestaurant(req, res, next) {
    try {
        const allRestaurants = await restaurantModel.find({});
        res.status(200).json(allRestaurants);
    } catch (error) {
        next(error);
    }
}

async function getRestaurantById(req, res, next) {
    try {
        const restaurant = await restaurantModel.findById(
            req.params.restaurantId
        );
        if (restaurant) {
            res.status(200).json(restaurant);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error);
    }
}

async function updateRestaurant(req, res, next) {
    try {
        let updatedRestaurant = await restaurantModel.findByIdAndUpdate(
            req.params.restaurantId,
            req.body,
            { new: true }
        );
        if (updatedRestaurant) {
            res.status(200).json(updatedRestaurant);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error);
    }
}

async function deleteRestaurant(req, res, next) {
    try {
        let deletedRestaurant = await restaurantModel.findByIdAndDelete(
            req.params.restaurantId
        );
        if (deletedRestaurant) {
            res.status(200).json(deletedRestaurant);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createRestaurant,
    getRestaurant,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
};
