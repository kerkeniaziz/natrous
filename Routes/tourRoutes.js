const express = require('express');
const tourConnctrollers = require('./../controller/tourController');
const Router = express.Router();

Router
    .route('/')
    .get(tourConnctrollers.getAllTours)
    .post(tourConnctrollers.addNewTour); 

Router
    .route('/:id')
    .get(tourConnctrollers.getTourById)
    .patch(tourConnctrollers.updateTourById)
    .delete(tourConnctrollers.deleteTourById);

    module.exports = Router;