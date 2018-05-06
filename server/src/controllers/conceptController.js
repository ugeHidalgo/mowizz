/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var url = require ('url'),
    ConceptManager = require ('../managers/conceptManager'),
    auth = require ('../auth/authMiddleware');

module.exports.init = function (app) {
    // (POST)http:localhost:3000/api/concepts body: {name: 'a name', username:'ugeHidalgo'}
    app.post('/api/concept', auth.isUserAuthenticated, function(req, res, next){
        var conceptToUpdate =  req.body;

        ConceptManager.updateConcept ( conceptToUpdate, function(error, updatedConcept){
             if (error){
                res.status(400).send('Failed to save Cost Centre: ' + conceptToUpdate.name);
            } else {
                res.set('Content-Type','application/json');
                res.status(201).send(updatedConcept);
             }
        });
    });

    // (GET)http:localhost:3000/api/concepts/?username=pepe&active=true
    app.get ('/api/concepts', auth.isUserAuthenticated, function (req, res, next) {
        var queryString = url.parse(req.url, true).query,
            userName = queryString.username,
            active = queryString.active;

        if (res.error) {
            res.status(401).send(res.error);
        }

        if (userName) {
            if (active) {
                getActiveUserConcepts(userName, res)
            } else {
                getUserConcepts(userName, res)
            }
        }
    });

    // (GET)http:localhost:3000/api/concept/?id=5a78a8fe458a4c457a3b4969    
    app.get ('/api/concept', auth.isUserAuthenticated, function (req, res, next) {
        var queryString = url.parse(req.url, true).query,
            id = queryString.id;

        if (id) {
            getConceptById(id, res);
        }
    });

    console.log('Concepts controller initialized');
};

/**
 * Private methods.
 */
function getConceptById(id, res) {
    var msg;

    ConceptManager.getConceptById ( id, function(error, concept){
        if (error){
            console.log('Concepts controller returns an error (400)');
            res.status(400).send(error);
        } else {
            res.set('Content-Type','application/json');
            if (concept.length === 0 ) {
                msg = `No Concept found with id: ${id}`;
                console.log(msg);
                res.status(200).send([msg]);
            } else {
                console.log(`Concepts controller returns concept ${id} successfully.`);
                res.send(concept);
            }
        }
    });
}

function getUserConcepts(userName, res) {
    
    ConceptManager.getConcepts (userName, function(error, data){
        if (error){
            console.log('Concepts controller returns an error (400)');
            res.status(400).send(error);
        } else {
            console.log(`Concepts controller returns ${data.length} concepts successfully`);
            res.set('Content-Type','application/json');
            res.status(200).send(data);
        }
    });
}

function getActiveUserConcepts(userName, res) {
    
    ConceptManager.getActiveConcepts (userName, function(error, data){
        if (error){
            console.log('Concepts controller returns an error (400)');
            res.status(400).send(error);
        } else {
            console.log(`Concepts controller returns ${data.length} active concepts successfully`);
            res.set('Content-Type','application/json');
            res.status(200).send(data);
        }
    });
}