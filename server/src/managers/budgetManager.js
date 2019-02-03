/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var Budget = require ('../models/Budget'),
    BudgetDetail = require ('../models/budgetDetail');

module.exports.getBudgets = function (userName, callbackFn) {

    Budget.find({username: userName}, callbackFn)
        .sort({startDate: 'desc'})
        .populate('budgetDetails');
};

module.exports.getActiveBudgets = function (userName, callbackFn) {

    Budget.find({username: userName, active: true}, callbackFn)
        .sort({startDate: 'desc'})
        .populate('budgetDetails');
};

module.exports.getBudgetById = function (userName, id, callbackFn) {

    Budget.find({username: userName, _id: id}, callbackFn)
        .populate('budgetDetails');
};

module.exports.getBudgetsByName = function (userName, name, callbackFn) {

    Budget.find({username: userName, name: new RegExp(name, 'i')}, callbackFn)
        .populate('budgetDetails');

};

module.exports.updateBudget = function (budget, callbackFn) {

    var updatedValues = {};

    if (budget._id) {
        //Update existing.
        updatedValues = {
            name: budget.name,
            description: budget.description,
            comment: budget.comment,
            updated: new Date,
            active: budget.active,
            startDate: budget.startDate,
            endDate: budget.endDate,
            budgetDetails: budget.budgetDetails
        };

         Budget.findOneAndUpdate(
            {_id: budget._id},
            { $set: updatedValues },
            function (error){
                if (error){
                    callbackFn(error, null);
                } else {
                    console.log ('Budget data updated -->username: ' + budget.username + ' /id: ' + budget._id);
                    callbackFn(null, budget)
                }
            });
    } else {
        //Create new.
        var newBudget = new Budget(budget);

        newBudget.save(function (error) {
            if (error) {
                callbackFn(error, null);
            } else {
                console.log ('New budget saved ----->username: ' + newBudget.username + ' /id: ' + newBudget._id);
                callbackFn(null, newBudget);
            }
        });
    }
};