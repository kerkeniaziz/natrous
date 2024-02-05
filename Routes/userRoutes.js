const express = require('express');
const userController = require('./../controller/userController');

const Router = express.Router();

Router
    .route('/')
    .get(userController.getAllUser)
    .post(userController.addNewUser); 

Router
    .route('/:id')
    .get(userController.getUserById)
    .patch(userController.updateUserById)
    .delete(userController.deleteUserById);

module.exports = Router;