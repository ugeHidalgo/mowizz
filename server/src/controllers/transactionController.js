/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var url = require ('url'),
    transactionManager = require ('../managers/transactionManager'),
    auth = require ('../auth/authMiddleware');

module.exports.init = function (app) {
    
    // (POST)http:localhost:3000/api/transactions body: {name: 'a name', username:'ugeHidalgo'}
    app.post('/api/transaction', auth.isUserAuthenticated, function(req, res, next){
        var transactionToUpdate =  req.body;

        transactionManager.updateTransaction ( transactionToUpdate, function(error, updatedTransaction){
            if (error){
                res.status(400).send('Failed to save transaction: ' + transactionToUpdate.name);
            } else {
                res.set('Content-Type','application/json');
                res.status(201).send(updatedTransaction);
            }
        });
    });

    // (GET)http:localhost:3000/api/transactions/?username=pepe
    app.get ('/api/transactions', auth.isUserAuthenticated, function (req, res, next) {
        var queryString = url.parse(req.url, true).query,
            userName = queryString.username;

        if (res.error) {
            res.status(401).send(res.error);
        }

        if (userName) {
            getUserTransactions(userName, res)
        }
    });

    // (GET)http:localhost:3000/api/transaction/?id=5a78a8fe458a4c457a3b4969    
    app.get ('/api/transaction', auth.isUserAuthenticated, function (req, res, next) {
        var queryString = url.parse(req.url, true).query,
            id = queryString.id;

        if (id) {
            getTransactionById(id, res);
        }
    });

    console.log('Transactions controller initialized.');
};

/**
 * Private methods.
 */
function getTransactionById(id, res) {
    var msg;

    transactionManager.getTransactionById ( id, function(error, transaction){
        if (error){
            console.log('Transactions controller returns an error (400)');
            res.status(400).send(error);
        } else {
            res.set('Content-Type','application/json');
            if (transaction.length === 0 ) {
                msg = `No Transaction found with id: ${id}`;
                console.log(msg);
                res.status(200).send([msg]);
            } else {
                console.log(`Transactions controller returns Transaction ${id} successfully.`);
                res.send(transaction);
            }
        }
    });
}

function getUserTransactions(userName, res) {
    
    transactionManager.getTransactions (userName, function(error, data){
        if (error){
            console.log('Transactions controller returns an error (400)');
            res.status(400).send(error);
        } else {
            console.log(`Transactions controller returns ${data.length} Transactions successfully`);
            res.set('Content-Type','application/json');
            res.status(200).send(data);
        }
    });
}