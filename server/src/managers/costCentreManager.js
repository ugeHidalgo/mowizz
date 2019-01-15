/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var CostCentre = require ('../models/costCentre');

module.exports.getCostCentres = function (userName, callbackFn) {

    CostCentre.find({username: userName}, callbackFn);
};

module.exports.getActiveCostCentres = function (userName, callbackFn) {

    CostCentre.find({username: userName, active: true}, callbackFn);
};

module.exports.getCostCentreById = function (userName, id, callbackFn) {

    CostCentre.find({username: userName, _id: id}, callbackFn);
};

module.exports.getCostCentresByName = function (userName, name, callbackFn) {

    CostCentre.find({username: userName, name: new RegExp(name, 'i')}, callbackFn);
};

module.exports.updateCostCentre = function (costCentre, callbackFn) {

    var updatedValues = {};

    if (costCentre._id) {
        //Update existing.
        updatedValues = {
            name: costCentre.name,
            description: costCentre.description,
            comment: costCentre.comment,
            updated: new Date,
            active: costCentre.active
        };

         CostCentre.findOneAndUpdate(
            {_id: costCentre._id},
            { $set: updatedValues },
            function (error){
                if (error){
                    callbackFn(error, null);
                } else {
                    console.log ('CostCentre data updated -->username: ' + costCentre.username + ' /id: ' + costCentre._id);
                    callbackFn(null, costCentre)
                }
            });
    } else {
        //Create new.
        var newCostCentre = new CostCentre(costCentre);

        newCostCentre.save(function (error) {
            if (error) {
                callbackFn(error, null);
            } else {
                console.log ('New CostCentre saved ----->username: ' + newCostCentre.username + ' /id: ' + newCostCentre._id);
                callbackFn(null, newCostCentre);
            }
        });
    }
};