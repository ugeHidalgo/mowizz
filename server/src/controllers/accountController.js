/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var url = require ('url'),
    accountManager = require ('../managers/accountManager'),
    auth = require ('../auth/authMiddleware');

module.exports.init = function (app) {
    // (POST)http:localhost:3000/api/accounts body: {name: 'a name', username:'ugeHidalgo'}
    app.post('/api/account', auth.isUserAuthenticated, function(req, res, next){
        var accountToUpdate =  req.body;

        accountManager.updateAccount ( accountToUpdate, function(error, updatedAccount){
             if (error){
                res.status(400).send('Failed to save account: ' + accountToUpdate.name);
            } else {
                res.set('Content-Type','application/json');
                res.status(201).send(updatedAccount);
             }
        });
    });

    // (GET)http:localhost:3000/api/accounts/?username=pepe&active=true
    app.get ('/api/accounts', auth.isUserAuthenticated, function (req, res, next) {
        var queryString = url.parse(req.url, true).query,
            userName = queryString.username,
            active = queryString.active;
;

        if (res.error) {
            res.status(401).send(res.error);
        }

        if (userName) {
            if (active) {
                getActiveUserAccounts(userName, res);
            } else {
                getUserAccounts(userName, res);
            }
        }
    });

    // (GET)http:localhost:3000/api/account/?id=5a78a8fe458a4c457a3b4969&username=pepe
    app.get ('/api/account', auth.isUserAuthenticated, function (req, res, next) {
        var queryString = url.parse(req.url, true).query,
            id = queryString.id,
            userName = queryString.username;

        if (id) {
            getAccountById(userName, id, res);
        }
    });

    console.log('Accounts controller initialized.');
};

/**
 * Private methods.
 */
function getAccountById(userName, id, res) {
    var msg;

    accountManager.getAccountById (userName, id, function(error, account){
        if (error){
            console.log('Accounts controller returns an error (400)');
            res.status(400).send(error);
        } else {
            res.set('Content-Type','application/json');
            if (account.length === 0 ) {
                msg = `No account found with id: ${id}`;
                console.log(msg);
                res.status(200).send([msg]);
            } else {
                console.log(`Accounts controller returns account ${id} for user "${userName}" successfully.`);
                res.send(account);
            }
        }
    });
}

function getUserAccounts(userName, res) {

    accountManager.getAccounts (userName, function(error, data){
        if (error){
            console.log('Accounts controller returns an error (400).');
            res.status(400).send(error);
        } else {
            console.log(`Accounts controller returns ${data.length} accounts for user "${userName}" successfully.`);
            res.set('Content-Type','application/json');
            res.status(200).send(data);
        }
    });
}

function getActiveUserAccounts(userName, res) {

    accountManager.getActiveAccounts (userName, function(error, data){
        if (error){
            console.log('Accounts controller returns an error (400)');
            res.status(400).send(error);
        } else {
            console.log(`Accounts controller returns ${data.length} active accounts for user "${userName}" successfully.`);
            res.set('Content-Type','application/json');
            res.status(200).send(data);
        }
    });
}