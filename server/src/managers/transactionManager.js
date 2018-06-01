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
        .sort({date: 'desc'})
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

module.exports.deleteTransactionById = function (id, callbackFn) {

    Transaction.findOneAndRemove({username: defaultUserName, _id: id}, function (error, transaction) {
        if (error) {
            callbackFn(error, null);
        } else {
            transaction.amount = transaction.amount * -1;
            transaction.accountAmount = transaction.accountAmount - transaction.amount;
            updateAccountAmount(error, transaction, callbackFn);
        }
    });
};

module.exports.updateTransaction = function (transaction, callbackFn) {

    transaction = setAmountValueAsNegativeForExpenses(transaction);

    accountManager.getAccountById(transaction.username, transaction.account, function (error, accounts) {
        var account;

        if (error) {
            callbackFn(error,null);
        } else {
            account = accounts[0];
            transaction.accountAmount = account.amount + transaction.amount;
            if (transaction._id) {
                updateTransaction(transaction, callbackFn);
            } else {
                createTransaction(transaction, callbackFn);
            }
        }
    });     
};

// Private methods

function setAmountValueAsNegativeForExpenses(transaction) {
    if (transaction.transactionType === 2 && transaction.amount > 0) {
        transaction.amount = transaction.amount * -1;
    }
    return transaction;
}

function updateTransaction(transaction, callbackFn) {
    var updatedValues = {
        amount: transaction.amount,
        date: transaction.date,
        transactionType: transaction.transactionType,
        concept: transaction.concept,
        costCentre: transaction.costCentre,
        account: transaction.account,
        accountAmount: transaction.accountAmount,
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
}

function createTransaction(transaction, callbackFn) {
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