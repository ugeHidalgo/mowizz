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
    // (GET)http:localhost:3000/api/transactions/?username=pepe&transtype=2&datefrom=fhfh&dateto=2871298
    app.get ('/api/transactions', auth.isUserAuthenticated, function (req, res, next) {
        var queryString = url.parse(req.url, true).query,
            userName = queryString.username,
            transactionType = queryString.transtype,
            dateFrom = queryString.datefrom,
            dateTo = queryString.dateto;

        if (res.error) {
            res.status(401).send(res.error);
        }

        if (userName) {
            if (transactionType && dateFrom && dateTo) {
                getUserTransactionsByType(userName, transactionType, dateFrom, dateTo, res)
            } else {
                getUserTransactions(userName, res);
            }
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

    // (DELETE)http:localhost:3000/api/transaction/?id=5a78a8fe458a4c457a3b4969    
    app.delete ('/api/transaction', auth.isUserAuthenticated, function (req, res, next) {
        var queryString = url.parse(req.url, true).query,
            id = queryString.id;

        if (id) {
            deleteTransactionById(id, res);
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

function deleteTransactionById(id, res) {
    var msg;

    transactionManager.deleteTransactionById ( id, function(error, transaction){
        if (error){
            console.log('Transactions controller returns an error (400)');
            res.status(400).send(error);
        } else {
            res.set('Content-Type','application/json');
            if (transaction.length === 0 ) {
                msg = `No Transaction found with id: ${id}`;
                console.log(msg);
                res.status(200).send(false);
            } else {
                msg = `Transactions controller deleted Transaction ${id} successfully.`;
                console.log(msg);
                res.send(true);
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

function getUserTransactionsByType(userName, transactionType, dateFrom, dateTo, res) {
    
    transactionManager.getTransactionsByType (userName, transactionType, dateFrom, dateTo, function(error, data){
        if (error){
            console.log('Transactions controller returns an error (400)');
            res.status(400).send(error);
        } else {
            console.log(`Transactions controller returns ${data.length} Transactions successfully of type ${transactionType} between ${dateFrom} and ${dateTo}`);
            res.set('Content-Type','application/json');
            res.status(200).send(data);
        }
    });
}