var seedData = require ('./seedData'),
    mongoose = require ('mongoose'),
    Hero = require ('../models/hero'),
    defaultUser = 'ugehidalgo';

module.exports.seedHeroesData = function () {
    
    var heroes, newHero;

    console.log ('Data seed tool: Checking if heroes data exist for user: ' + defaultUser);
    Hero.find ({username: defaultUser}, function(error, heroes) {
        if (error){
            console.log ('Data seed tool: Failed to count heroes in database: ' + error);
        } else {
            if (heroes.length === 0) {
                console.log ('Data seed tool: Seeding heroes data into database.');
                seedData.initialHeroes.forEach (function (hero) {
                    newHero = new Hero(hero);
                    newHero.save(function (error){
                        if (error){
                            console.log (`Data seed tool: Failed to insert hero ${hero.name} in database: ${error}`);
                            reject();
                        } else {
                            console.log (`Data seed tool: Hero ${hero.name} added to database. `);
                        }
                    });
                });
            } else {
                console.log ('Data seed tool: Heroes database already seeded.');
            };
        }
    });
};

