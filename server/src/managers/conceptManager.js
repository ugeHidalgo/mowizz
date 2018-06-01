/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var defaultUserName = 'ugehidalgo',
    mongoose = require ('mongoose'),
    Concept = require ('../models/Concept');

module.exports.getConcepts = function (userName, callbackFn) {

    Concept.find({username: defaultUserName}, callbackFn);
};

module.exports.getActiveConcepts = function (userName, callbackFn) {

    Concept.find({username: defaultUserName, active: true}, callbackFn);
};

module.exports.getConceptById = function (username, id, callbackFn) {

    Concept.find({username: username, _id: id}, callbackFn);
};

module.exports.getConceptsByName = function (name, callbackFn) {

    var regexString = `/${name}/`;
    Concept.find({username: defaultUserName, name: new RegExp(name, 'i')}, callbackFn);
};

module.exports.getActiveConceptsByType = function (name, type, callbackFn) {

    var regexString = `/${name}/`;
    Concept.find({username: defaultUserName, active: true, transactionType: type}, callbackFn);
};

module.exports.updateConcept = function (concept, callbackFn) {

    var updatedValues = {};

    if (concept._id) {
        //Update existing.
        updatedValues = {
            name: concept.name,
            description: concept.description,
            transactionType: concept.transactionType,
            comments: concept.comments,
            updated: new Date,
            active: concept.active
        };
 
         Concept.findOneAndUpdate(
            {_id: concept._id}, 
            { $set: updatedValues },
            function (error){
                if (error){
                    callbackFn(error, null);
                } else {
                    console.log ('Concept data updated -->username = ' + concept.username + ' /id = ' + concept._id);                        
                    callbackFn(null, concept)
                }
            }); 
    } else {
        //Create new.
        var newConcept = new Concept(concept);

        newConcept.save(function (error) {
            if (error) {
                callbackFn(error, null);
            } else {
                console.log ('New Concept saved ----->username = ' + newConcept.username + ' /id = ' + newConcept._id);
                callbackFn(null, newConcept);
            }
        });
    } 
};