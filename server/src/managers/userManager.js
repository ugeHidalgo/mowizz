/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require ('mongoose'),
    hasher = require ('../auth/hasher'),
    User = require ('../models/user');

/**
 * Public methods.
 */
module.exports.getUserById = function (id, callbackFn) {

    User.find({_id: id}, callbackFn);
};

module.exports.getUserByExactUserName = function (userName, callbackFn) {

    User.find({username: userName}, callbackFn);
};

module.exports.getUserByUserName = function (userName, callbackFn) {

    var regexString = `/${userName}/`;
    User.find({username: new RegExp(userName, 'i')}, callbackFn);
};

module.exports.updateUser = function (user, callbackFn) {

    if (user._id) {
        updateExistingUser (user, callbackFn)
    } else {
        createNewUser(user, callbackFn);
    } 
};


/**
 * Private methods.
 */
function createNewUser (user, callbackFn){
    var newUser = new User(user),
            salt = hasher.createSalt();

        newUser.password = hasher.computeHash(user.password, salt);
        newUser.salt = salt;

        newUser.save(function (error) {
            if (error) {
                callbackFn(error, null);
            } else {
                console.log ('New user saved ----->username = ' + newUser.username + ' /id = ' + newUser._id);
                callbackFn(null, newUser);
            }
        });
};

function updateExistingUser (user, callbackFn) {

    var updatedValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
    };

    User.findOneAndUpdate(
    {_id: user._id}, 
    { $set: updatedValues },
    function (error){
        if (error){
            callbackFn(error, null);
        } else {
            console.log ('User data updated -->username = ' + user.username + ' /id = ' + user._id);                        
            callbackFn(null, user)
        }
    }); 
};