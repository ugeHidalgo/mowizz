/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var homeController = require ('./homeController'),
    authController = require ('./authController'),
    userController = require ('./userController'),
    accountController = require ('./accountController'),
    costCentreController = require ('./costCentreController'),
    conceptController = require ('./conceptController'),
    transactionController = require ('./transactionController'),
    budgetController = require ('./budgetController');

module.exports.init = function (app){
    console.log('Main controller initialized');
    homeController.init(app);
    authController.init(app);
    userController.init(app);
    accountController.init(app);
    costCentreController.init(app);
    conceptController.init(app);
    transactionController.init(app);
    budgetController.init(app);
};