const express = require('express');
const restaurantRouter = express.Router();
const restaurantController = require('../controllers/restaurant.controller');

restaurantRouter.post('/', restaurantController.createRestaurant);
restaurantRouter.get('/', restaurantController.getRestaurant);
restaurantRouter.get('/:restaurantId', restaurantController.getRestaurantById);
restaurantRouter.put('/:restaurantId', restaurantController.updateRestaurant);
restaurantRouter.delete(
    '/:restaurantId',
    restaurantController.deleteRestaurant
);

module.exports = restaurantRouter;
