/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var url = require ('url'),
    costCentreManager = require ('../managers/costCentreManager'),
    auth = require ('../auth/authMiddleware');

module.exports.init = function (app) {
    // (POST)http:localhost:3000/api/costCentres body: {name: 'a name', username:'ugeHidalgo'}
    app.post('/api/costCentre', auth.isUserAuthenticated, function(req, res, next){
        var costCentreToUpdate =  req.body;

        costCentreManager.updateCostCentre ( costCentreToUpdate, function(error, updatedCostCentre){
             if (error){
                res.status(400).send('Failed to save Cost Centre: ' + costCentreToUpdate.name);
            } else {
                res.set('Content-Type','application/json');
                res.status(201).send(updatedCostCentre);
             }
        });
    });

    // (GET)http:localhost:3000/api/costCentres/?username=pepe
    app.get ('/api/costCentres', auth.isUserAuthenticated, function (req, res, next) {
        var queryString = url.parse(req.url, true).query,
            userName = queryString.username;

        if (res.error) {
            res.status(401).send(res.error);
        }

        if (userName) {
            getUserCostCentres(userName, res)
        }
    });

    // (GET)http:localhost:3000/api/costCentre/?id=5a78a8fe458a4c457a3b4969    
    app.get ('/api/costCentre', auth.isUserAuthenticated, function (req, res, next) {
        var queryString = url.parse(req.url, true).query,
            id = queryString.id;

        if (id) {
            getcostCentreById(id, res);
        }
    });

    console.log('Cost Centres controller initialized');
};

/**
 * Private methods.
 */
function getcostCentreById(id, res) {
    var msg;

    costCentreManager.getCostCentreById ( id, function(error, costCentre){
        if (error){
            console.log('Cost Centres controller returns an error (400)');
            res.status(400).send(error);
        } else {
            res.set('Content-Type','application/json');
            if (costCentre.length === 0 ) {
                msg = `No Cost Centre found with id: ${id}`;
                console.log(msg);
                res.status(200).send([msg]);
            } else {
                console.log(`Cost Centres controller returns costCentre ${id} successfully.`);
                res.send(costCentre);
            }
        }
    });
}

function getUserCostCentres(userName, res) {
    
    costCentreManager.getCostCentres (userName, function(error, data){
        if (error){
            console.log('Cost Centres controller returns an error (400)');
            res.status(400).send(error);
        } else {
            console.log(`Cost Centres controller returns ${data.length} Cost Centres successfully`);
            res.set('Content-Type','application/json');
            res.status(200).send(data);
        }
    });
}