/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var Budget = require ('../models/Budget');

module.exports.getBudgets = function (userName, callbackFn) {

    Budget.find({username: userName}, callbackFn);
};

module.exports.getActiveBudgets = function (userName, callbackFn) {

    Budget.find({username: userName, active: true}, callbackFn);
};

module.exports.getBudgetById = function (userName, id, callbackFn) {

    Budget.find({username: userName, _id: id}, callbackFn);
};

module.exports.getBudgetsByName = function (userName, name, callbackFn) {

    Budget.find({username: userName, name: new RegExp(name, 'i')}, callbackFn);
};

module.exports.updateBudget = function (Budget, callbackFn) {

    var updatedValues = {};

    if (Budget._id) {
        //Update existing.
        updatedValues = {
            name: Budget.name,
            description: Budget.description,
            comment: Budget.comment,
            updated: new Date,
            active: Budget.active,
            startDate: Budget.startDate,
            endDate: Budget.endDate,
            concepts: Budget.concepts
        };

         Budget.findOneAndUpdate(
            {_id: Budget._id},
            { $set: updatedValues },
            function (error){
                if (error){
                    callbackFn(error, null);
                } else {
                    console.log ('Budget data updated -->username: ' + Budget.username + ' /id: ' + Budget._id);
                    callbackFn(null, Budget)
                }
            });
    } else {
        //Create new.
        var newBudget = new Budget(Budget);

        newBudget.save(function (error) {
            if (error) {
                callbackFn(error, null);
            } else {
                console.log ('New Budget saved ----->username: ' + newBudget.username + ' /id: ' + newBudget._id);
                callbackFn(null, newBudget);
            }
        });
    }
};