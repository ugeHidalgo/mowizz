/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var url = require ('url'),
    accountManager = require ('../managers/accountManager'),
    auth = require ('../auth/authMiddleware');


/* function isUserAuthenticated (req, res, next) {
    next();
} */

module.exports.init = function (app) {
    // (POST)http:localhost:3000/api/accounts body: {name: 'a name', username:'ugeHidalgo'}
    app.post('/api/account', auth.isUserAuthenticated, function(request, response, next){

        var accountToUpdate =  request.body;

        accountManager.updateAccount ( accountToUpdate, function(error, updatedAccount){
             if (error){
                response.status(400).send('Failed to save account: ' + accountToUpdate.name);
            } else {
                response.set('Content-Type','application/json');
                response.status(201).send(updatedAccount);
             }
        });
    });

    app.get ('/api/accounts', auth.isUserAuthenticated, function (req, res, next) {
        // (GET)http:localhost:3000/api/accounts
        if (res.error) {
            res.status(401).send(res.error);
        }
        accountManager.getAccounts (function(error, data){
            if (error){
                console.log('accounts controller returns an error (400)');
                res.status(400).send(error);
            } else {
                console.log(`accounts controller returns ${data.length} accounts successfully`);
                res.set('Content-Type','application/json');
                res.status(200).send(data);
            }
        });
    });

    app.get ('/api/accounts/:id', auth.isUserAuthenticated, function (req, res, next) {
        var id = req.params.id,
            msg;

        // (GET)http:localhost:3000/api/account/5a78a8fe458a4c457a3b4969
        accountManager.getAccountById ( id, function(error, account){
            if (error){
                console.log('accounts controller returns an error (400)');
                res.status(400).send(error);
            } else {
                res.set('Content-Type','application/json');
                if (account.length === 0 ) {
                    msg = `No account found with id: ${id}`;
                    console.log(msg);
                    res.status(200).send([msg]);
                } else {
                    console.log(`accounts controller returns account ${id} successfully.`);
                    res.send(account);
                }
            }
        });
    });

    app.get ('/api/account', auth.isUserAuthenticated, function (req, res, next) {
        // By name: (GET)http:localhost:3000/api/account/?name=superman
        // By Id: (GET)http:localhost:3000/api/account/?id=5a78a8fe458a4c457a3b4969
        var queryString = url.parse(req.url, true).query,
            name = queryString.name, 
            id = queryString.id,
            msg;
        
        if (name) {
            accountManager.getAccountsByName ( name, function(error, accountes){
                if (error){
                    console.log('accounts controller returns an error (400)');
                    res.status(400).send(error);
                } else {
                    res.set('Content-Type','application/json');
                    if (accountes.length === 0 ) {
                        msg = `No accounts found with name: ${name}`;
                        console.log(msg);
                        res.status(200).send([msg]);
                    } else {
                        console.log(`accounts controller returns ${accounts.length} accounts successfully.`);
                        res.status(200).send(accounts);
                    }
                }
            });
        }

        if (id) {
            accountManager.getAccountById ( id, function(error, account){
                if (error){
                    console.log('accounts controller returns an error (400)');
                    res.status(400).send(error);
                } else {
                    res.set('Content-Type','application/json');
                    if (account.length === 0 ) {
                        msg = `No account found with id: ${id}`;
                        console.log(msg);
                        res.status(200).send([msg]);
                    } else {
                        console.log(`accounts controller returns account ${id} successfully.`);
                        res.send(account);
                    }
                }
            });
        }
    });

    console.log('accounts controller initialized');
};