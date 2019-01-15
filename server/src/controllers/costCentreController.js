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

    // (GET)http:localhost:3000/api/costCentres/?username=pepe&active=true
    app.get ('/api/costCentres', auth.isUserAuthenticated, function (req, res, next) {
        var queryString = url.parse(req.url, true).query,
            userName = queryString.username,
            active = queryString.active;

        if (res.error) {
            res.status(401).send(res.error);
        }

        if (userName) {
            if (active) {
                getActiveUserCostCentres(userName, res)
            } else {
                getUserCostCentres(userName, res)
            }
        }
    });

    // (GET)http:localhost:3000/api/costCentre/?id=5a78a8fe458a4c457a3b4969?username=pepe
    app.get ('/api/costCentre', auth.isUserAuthenticated, function (req, res, next) {
        var queryString = url.parse(req.url, true).query,
            id = queryString.id,
            userName = queryString.username;

        if (id) {
            getcostCentreById(userName, id, res);
        }
    });

    console.log('Cost Centres controller initialized');
};

/**
 * Private methods.
 */
function getcostCentreById(userName, id, res) {
    var msg;

    costCentreManager.getCostCentreById (userName, id, function(error, costCentre){
        if (error){
            console.log('Cost Centres controller returns an error (400).');
            res.status(400).send(error);
        } else {
            res.set('Content-Type','application/json');
            if (costCentre.length === 0 ) {
                msg = `No Cost Centre found with id: ${id}`;
                console.log(msg);
                res.status(200).send([msg]);
            } else {
                console.log(`Cost Centres controller returns costCentre ${id} for user "${userName}" successfully.`);
                res.send(costCentre);
            }
        }
    });
}

function getUserCostCentres(userName, res) {

    costCentreManager.getCostCentres (userName, function(error, data){
        if (error){
            console.log('Cost Centres controller returns an error (400).');
            res.status(400).send(error);
        } else {
            console.log(`Cost Centres controller returns ${data.length} Cost Centres for user "${userName}" successfully.`);
            res.set('Content-Type','application/json');
            res.status(200).send(data);
        }
    });
}

function getActiveUserCostCentres(userName, res) {

    costCentreManager.getActiveCostCentres (userName, function(error, data){
        if (error){
            console.log('Cost Centres controller returns an error (400).');
            res.status(400).send(error);
        } else {
            console.log(`Cost Centres controller returns ${data.length} active cost Centres for user "${userName}" successfully.`);
            res.set('Content-Type','application/json');
            res.status(200).send(data);
        }
    });
}