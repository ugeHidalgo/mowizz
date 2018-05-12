/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var defaultUserName = 'ugehidalgo',
    mongoose = require ('mongoose'),
    accountManager = require ('../managers/accountManager'),
    Transaction = require ('../models/transaction');

module.exports.getTransactions = function (userName, callbackFn) {

    Transaction
        .find({username: userName}, callbackFn)
        .populate('concept')
        .populate('costCentre')
        .populate('account');
};

module.exports.getTransactionById = function (id, callbackFn) {

    Transaction
        .find({username: defaultUserName, _id: id}, callbackFn)
        .populate('concept')
        .populate('costCentre')
        .populate('account');
};

module.exports.updateTransaction = function (transaction, callbackFn) {

    var updatedValues = {};

    transaction = setAmountValueAsNegativeForExpenses(transaction);

    if (transaction._id) {
        //Update existing.
        updatedValues = {
            amount: transaction.amount,
            date: transaction.date,
            transactionType: transaction.transactionType,
            concept: transaction.concept,
            costCentre: transaction.costCentre,
            account: transaction.account,
            comments: transaction.comments,
        };
 
         Transaction.findOneAndUpdate(
            {_id: transaction._id}, 
            { $set: updatedValues })
            .exec(function (error){
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
                updateAccountAmount(error, newTransaction, callbackFn);
            }
        });
    } 
};

function setAmountValueAsNegativeForExpenses(transaction) {
    if (transaction.transactionType === 2 && transaction.amount > 0) {
        transaction.amount = transaction.amount * -1;
    }
    return transaction;
}

function updateAccountAmount(error, transaction, callbackFn) {
    accountManager.updateAccountAmount(transaction.account, transaction.amount, function(error){
        if (error){
           console.log('Failed to update account amount.');
       } else {
            console.log('Updated account amount succesfully.');
        }
   });
    callbackFn(null, transaction);
}