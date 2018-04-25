/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var url = require ('url'),
    transactionManager = require ('../managers/transactionManager'),
    auth = require ('../auth/authMiddleware');

module.exports.init = function (app) {
    
    console.log('Transactions controller initialized.');
};

/**
 * Private methods.
 */