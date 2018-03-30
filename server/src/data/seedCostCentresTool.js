var costCentresSeedData = require ('./seedData/costCentresSeedData'),
    mongoose = require ('mongoose'),
    CostCentre = require ('../models/costCentre');

module.exports.seedCostCentresData = function (defaultUser) {
    
    var costCentres, newCostCentre;

    console.log ('Data seed tool: Checking if costCentre data exist for user: ' + defaultUser);
    CostCentre.find ({username: defaultUser}, function(error, costCentres) {
        if (error){
            console.log ('Data seed tool: Failed to count costCentres in database: ' + error);
        } else {
            if (costCentres.length === 0) {
                console.log ('Data seed tool: Seeding costCentres data into database.');
                costCentresSeedData.initialCostCentres.forEach (function (costCentre) {
                    newCostCentre = new CostCentre(costCentre);
                    newCostCentre.username = defaultUser;
                    newCostCentre.save(function (error){
                        if (error){
                            console.log (`Data seed tool: Failed to insert costCentre ${costCentre.name} in database: ${error}`);
                            reject();
                        } else {
                            console.log (`Data seed tool: costCentre ${costCentre.name} added to database. `);
                        }
                    });
                });
            } else {
                console.log ('Data seed tool: costCentres database already seeded.');
            };
        }
    });
};

