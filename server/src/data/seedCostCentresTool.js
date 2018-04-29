var costCentresSeedData = require ('./seedData/costCentresSeedData'),
    mongoose = require ('mongoose'),
    CostCentre = require ('../models/costCentre');

module.exports.seedCostCentresData = function (defaultUser) {

    return new Promise (function (resolve, reject ){
    
        var costCentres, 
            newCostCentre, 
            f = costCentresSeedData.initialCostCentres.length;

        console.log ('(3-START) Data seed tool: Checking if Cost centre data exist for user: ' + defaultUser);
        CostCentre.find ({username: defaultUser}, function(error, costCentres) {
            if (error){
                console.log ('(3-END) Data seed tool: Failed to count Cost centres in database: ' + error);
                reject();
            } else {
                if (costCentres.length === 0) {
                    console.log ('(3) Data seed tool: Seeding Cost centres data into database.');
                    costCentresSeedData.initialCostCentres.forEach (function (costCentre) {
                        newCostCentre = new CostCentre(costCentre);
                        newCostCentre.username = defaultUser;
                        newCostCentre.save(function (error){
                            if (error){
                                console.log (`(3-END) Data seed tool: Failed to insert cost centre ${costCentre.name} in database: ${error}`);
                                reject();
                            } else {
                                console.log (`(3) Data seed tool: cost centre ${costCentre.name} added to database. `);
                                f--;
                                if (f===0){
                                    console.log ('(3-END) Data seed tool: Cost centres database seeding finished.');
                                    resolve();
                                }
                            }
                        });
                    });
                } else {
                    console.log ('(3-END) Data seed tool: Cost centres database already seeded.');
                    resolve();
                };                
            }
        });
    });
};

