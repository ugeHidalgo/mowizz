/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var //defaultUserName = 'ugehidalgo',
    //mongoose = require ('mongoose'),
    Account = require ('../models/account');

module.exports.getAccounts = function (userName, callbackFn) {

    Account.find({username: userName}, callbackFn);
};

module.exports.getActiveAccounts = function (userName, callbackFn) {

    Account.find({username: userName, active: true}, callbackFn);
};

module.exports.getAccountById = function (userName, id, callbackFn) {

    Account.find({username: userName, _id: id}, callbackFn);
};

module.exports.getAccountsByName = function (userName, name, callbackFn) {

    //var regexString = `/${name}/`;
    Account.find({username: userName, name: new RegExp(name, 'i')}, callbackFn);
};


module.exports.updateAccount = function (account, callbackFn) {

    var updatedValues = {};

    if (account._id) {
        //Update existing.
        updatedValues = {
            active: account.active,
            name: account.name,
            description: account.description,
            iban: account.iban,
            comments: account.comments,
            updated: new Date,
            amount: account.amount
        };

         Account.findOneAndUpdate(
            {_id: account._id},
            { $set: updatedValues },
            function (error){
                if (error){
                    callbackFn(error, null);
                } else {
                    console.log ('Account data updated -->username: ' + account.username + ' /id: ' + account._id);
                    callbackFn(null, account)
                }
            });
    } else {
        //Create new.
        var newAccount = new Account(account);

        newAccount.save(function (error) {
            if (error) {
                callbackFn(error, null);
            } else {
                console.log ('New account saved ----->username: ' + newAccount.username + ' /id: ' + newAccount._id);
                callbackFn(null, newAccount);
            }
        });
    }
};

module.exports.updateAccountAmount = function (accountId, amountToAdd, callbackFn) {

    Account.findOneAndUpdate(
    {_id: accountId},
    { $inc: { amount: amountToAdd } },
    function (error, data){
        if (error){
            callbackFn(error);
        } else {
            console.log ('Account amount updated with' + amountToAdd + ' for account with id ' + accountId);
            callbackFn(null)
        }
    });
};