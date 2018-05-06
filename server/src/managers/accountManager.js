/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var defaultUserName = 'ugehidalgo',
    mongoose = require ('mongoose'),
    Account = require ('../models/account');

module.exports.getAccounts = function (userName, callbackFn) {

    Account.find({username: userName}, callbackFn);
};

module.exports.getActiveAccounts = function (userName, callbackFn) {

    Account.find({username: userName, active: true}, callbackFn);
};

module.exports.getAccountById = function (id, callbackFn) {

    Account.find({username: defaultUserName, _id: id}, callbackFn);
};

module.exports.getAccountsByName = function (name, callbackFn) {

    var regexString = `/${name}/`;
    Account.find({username: defaultUserName, name: new RegExp(name, 'i')}, callbackFn);
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
            updated: new Date
        };
 
         Account.findOneAndUpdate(
            {_id: account._id}, 
            { $set: updatedValues },
            function (error){
                if (error){
                    callbackFn(error, null);
                } else {
                    console.log ('Account data updated -->username = ' + account.username + ' /id = ' + account._id);                        
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
                console.log ('New account saved ----->username = ' + newAccount.username + ' /id = ' + newAccount._id);
                callbackFn(null, newAccount);
            }
        });
    } 
};