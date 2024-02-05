const express = require('express');
const tourController = require('./../controller/tourController');
const Router = express.Router();

Router.param('id', tourController.checkId);


Router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody,tourController.addNewTour); 

Router
    .route('/:id')
    .get(tourController.getTourById)
    .patch(tourController.updateTourById)
    .delete(tourController.deleteTourById);

module.exports = Router;