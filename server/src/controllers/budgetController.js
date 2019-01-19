/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var url = require ('url'),
    BudgetManager = require ('../managers/budgetManager'),
    auth = require ('../auth/authMiddleware');

module.exports.init = function (app) {
    // (POST)http:localhost:3000/api/budget body: {name: 'a name', username:'ugeHidalgo'}
    app.post('/api/budget', auth.isUserAuthenticated, function(req, res, next){
        var budgetToUpdate =  req.body;

        BudgetManager.updateBudget ( budgetToUpdate, function(error, updatedBudget){
             if (error){
                res.status(400).send('Failed to save Budget: ' + BudgetToUpdate.name);
            } else {
                res.set('Content-Type','application/json');
                res.status(201).send(updatedBudget);
             }
        });
    });

    // (GET)http:localhost:3000/api/budgets/?username=pepe&active=true&type=expense
    app.get ('/api/budgets', auth.isUserAuthenticated, function (req, res, next) {
        var queryString = url.parse(req.url, true).query,
            userName = queryString.username,
            type = queryString.type,
            active = queryString.active;

        if (res.error) {
            res.status(401).send(res.error);
        }

        if (userName) {
            if (active) {
                if (type) {
                    getActiveUserBudgetsByType(userName, type, res)
                } else {
                    getActiveUserBudgets(userName, res)
                }
            } else {
                getUserBudgets(userName, res)
            }
        }
    });

    // (GET)http:localhost:3000/api/budget/?id=5a78a8fe458a4c457a3b4969&username=pepe
    app.get ('/api/budget', auth.isUserAuthenticated, function (req, res, next) {
        var queryString = url.parse(req.url, true).query,
            id = queryString.id,
            userName = queryString.username;

        if (id) {
            getBudgetById(userName, id, res);
        }
    });

    console.log('Budgets controller initialized.');
};

/**
 * Private methods.
 */
function getBudgetById(userName, id, res) {
    var msg;

    BudgetManager.getBudgetById (userName, id, function(error, data){
        if (error){
            console.log('Budgets controller returns an error (400).');
            res.status(400).send(error);
        } else {
            res.set('Content-Type','application/json');
            if (data.length === 0 ) {
                msg = `No Budget found with id: ${id} for user "${userName}".`;
                console.log(msg);
                res.status(200).send([msg]);
            } else {
                console.log(`Budgets controller returns Budget ${id} for user "${userName}" successfully.`);
                res.send(data);
            }
        }
    });
}

function getUserBudgets(userName, res) {

    BudgetManager.getBudgets (userName, function(error, data){
        if (error){
            console.log('Budgets controller returns an error (400).');
            res.status(400).send(error);
        } else {
            console.log(`Budgets controller returns ${data.length} budgets for user "${userName}" successfully.`);
            res.set('Content-Type','application/json');
            res.status(200).send(data);
        }
    });
}

function getActiveUserBudgets(userName, res) {

    BudgetManager.getActiveBudgets (userName, function(error, data){
        if (error){
            console.log('Budgets controller returns an error (400).');
            res.status(400).send(error);
        } else {
            console.log(`Budgets controller returns ${data.length} active budgets for user "${userName}" successfully.`);
            res.set('Content-Type','application/json');
            res.status(200).send(data);
        }
    });
}

function getActiveUserBudgetsByType(userName, type, res) {

var BudgetType = 1 // income

    if (type==='expense') BudgetType = 2;

    BudgetManager.getActiveBudgetsByType (userName, BudgetType, function(error, data){
        if (error){
            console.log('Budgets controller returns an error (400).');
            res.status(400).send(error);
        } else {
            console.log(`Budgets controller returns ${data.length} active budgets for type ${BudgetType} and user "${userName}" successfully.`);
            res.set('Content-Type','application/json');
            res.status(200).send(data);
        }
    });
}