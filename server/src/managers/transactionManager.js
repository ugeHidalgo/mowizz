/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var defaultUserName = 'ugehidalgo',
    mongoose = require ('mongoose'),
    Transaction = require ('../models/transaction');

module.exports.getTransactions = function (userName, callbackFn) {

    Transaction.find({username: userName}, callbackFn);
};

module.exports.getTransactionById = function (id, callbackFn) {

    Transaction.find({username: defaultUserName, _id: id}, callbackFn);
};

module.exports.updateTransaction = function (transaction, callbackFn) {

    var updatedValues = {};

    if (transaction._id) {
        //Update existing.
        updatedValues = {
            amount: transaction.amount,
            date: transaction.date,
            transactionType: transaction.transactionType,
            comments: transaction.comments,
        };
 
         Transaction.findOneAndUpdate(
            {_id: transaction._id}, 
            { $set: updatedValues },
            function (error){
                if (error){
                    callbackFn(error, null);
                } else {
                    console.log ('Transaction data updated -->username = ' + transaction.username + ' /id = ' + transaction._id);                        
                    callbackFn(null, Transaction)
                }
            }); 
    } else {
        //Create new.
        var newTransaction = new Transaction(transaction);

        newTransaction.save(function (error) {
            if (error) {
                callbackFn(error, null);
            } else {
                console.log ('New Transaction saved ----->username = ' + newTransaction.username + ' /id = ' + newTransaction._id);
                callbackFn(null, newTransaction);
            }
        });
    } 
};