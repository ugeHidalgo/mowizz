/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var url = require ('url'),
    costCentreManager = require ('../managers/costCentreManager'),
    auth = require ('../auth/authMiddleware');


/* function isUserAuthenticated (req, res, next) {
    next();
} */

module.exports.init = function (app) {
    // (POST)http:localhost:3000/api/costCentres body: {name: 'a name', username:'ugeHidalgo'}
    app.post('/api/costCentres', auth.isUserAuthenticated, function(request, response, next){

        var costCentreToUpdate =  request.body;

        costCentreManager.updateCostCentre ( costCentreToUpdate, function(error, updatedCostCentre){
             if (error){
                response.status(400).send('Failed to save costCentre: ' + updatedCostCentre.name);
            } else {
                response.set('Content-Type','application/json');
                response.status(201).send(updatedCostCentre);
             }
        });
    });

    app.get ('/api/costCentres', auth.isUserAuthenticated, function (req, res, next) {
        // (GET)http:localhost:3000/api/costCentres
        if (res.error) {
            res.status(401).send(res.error);
        }
        costCentreManager.getCostCentres (function(error, data){
            if (error){
                console.log('costCentres controller returns an error (400)');
                res.status(400).send(error);
            } else {
                console.log(`costCentres controller returns ${data.length} costCentres successfully`);
                res.set('Content-Type','application/json');
                res.status(200).send(data);
            }
        });
    });

    app.get ('/api/costCentres/:id', auth.isUserAuthenticated, function (req, res, next) {
        var id = req.params.id,
            msg;

        // (GET)http:localhost:3000/api/costCentre/5a78a8fe458a4c457a3b4969
        costCentreManager.getCostCentreById ( id, function(error, costCentre){
            if (error){
                console.log('costCentres controller returns an error (400)');
                res.status(400).send(error);
            } else {
                res.set('Content-Type','application/json');
                if (costCentre.length === 0 ) {
                    msg = `No costCentre found with id: ${id}`;
                    console.log(msg);
                    res.status(200).send([msg]);
                } else {
                    console.log(`costCentres controller returns costCentre ${id} successfully.`);
                    res.send(costCentre);
                }
            }
        });
    });

    app.get ('/api/costCentre', auth.isUserAuthenticated, function (req, res, next) {
        // By name: (GET)http:localhost:3000/api/costCentre/?name=superman
        // By Id: (GET)http:localhost:3000/api/costCentre/?id=5a78a8fe458a4c457a3b4969
        var queryString = url.parse(req.url, true).query,
            name = queryString.name, 
            id = queryString.id,
            msg;
        
        if (name) {
            costCentreManager.getCostCentresByName ( name, function(error, costCentres){
                if (error){
                    console.log('costCentres controller returns an error (400)');
                    res.status(400).send(error);
                } else {
                    res.set('Content-Type','application/json');
                    if (costCentres.length === 0 ) {
                        msg = `No costCentres found with name: ${name}`;
                        console.log(msg);
                        res.status(200).send([msg]);
                    } else {
                        console.log(`costCentres controller returns ${costCentres.length} costCentres successfully.`);
                        res.status(200).send(costCentres);
                    }
                }
            });
        }

        if (id) {
            costCentreManager.getCostCentreById ( id, function(error, costCentre){
                if (error){
                    console.log('costCentres controller returns an error (400)');
                    res.status(400).send(error);
                } else {
                    res.set('Content-Type','application/json');
                    if (costCentre.length === 0 ) {
                        msg = `No costCentre found with id: ${id}`;
                        console.log(msg);
                        res.status(200).send([msg]);
                    } else {
                        console.log(`costCentres controller returns costCentre ${id} successfully.`);
                        res.send(costCentre);
                    }
                }
            });
        }
    });

    console.log('costCentres controller initialized');
};