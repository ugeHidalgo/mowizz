/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var defaultUserName = 'ugehidalgo',
    mongoose = require ('mongoose'),
    Hero = require ('../models/hero');

module.exports.getHeroes = function (callbackFn) {

    Hero.find({username: defaultUserName}, callbackFn);
};

module.exports.getHeroById = function (id, callbackFn) {

    Hero.find({username: defaultUserName, _id: id}, callbackFn);
};

module.exports.getHeroesByName = function (name, callbackFn) {

    var regexString = `/${name}/`;
    Hero.find({username: defaultUserName, name: new RegExp(name, 'i')}, callbackFn);
};

module.exports.deleteHeroById = function (id, callbackFn) { 
    Hero.deleteOne({username: defaultUserName, _id: id}, callbackFn);
};


module.exports.updateHero = function (hero, callbackFn) {

    var updatedValues = {};

    if (hero._id) {
        //Update existing hero.
        updatedValues = {
            name: hero.name,
        };
 
         Hero.findOneAndUpdate(
            {_id: hero._id}, 
            { $set: updatedValues },
            function (error){
                if (error){
                    callbackFn(error, null);
                } else {
                    console.log ('Hero data updated -->username = ' + hero.username + ' /id = ' + hero._id);                        
                    callbackFn(null, hero)
                }
            }); 
    } else {
        //Create new hero.
        var newHero = new Hero(hero);

        newHero.save(function (error) {
            if (error) {
                callbackFn(error, null);
            } else {
                console.log ('New hero saved ----->username = ' + newHero.username + ' /id = ' + newHero._id);
                callbackFn(null, newHero);
            }
        });
    } 
};