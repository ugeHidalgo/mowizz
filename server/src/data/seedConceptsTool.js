var conceptsSeedData = require ('./seedData/conceptsSeedData'),
    mongoose = require ('mongoose'),
    Concept = require ('../models/Concept');

module.exports.seedConceptsData = function (defaultUser) {
    
    var concepts, newConcept;

    console.log ('Data seed tool: Checking if concept data exist for user: ' + defaultUser);
    Concept.find ({username: defaultUser}, function(error, concepts) {
        if (error){
            console.log ('Data seed tool: Failed to count concepts in database: ' + error);
        } else {
            if (concepts.length === 0) {
                console.log ('Data seed tool: Seeding concepts data into database.');
                conceptsSeedData.initialConcepts.forEach (function (concept) {
                    newConcept = new Concept(concept);
                    newConcept.username = defaultUser;
                    newConcept.save(function (error){
                        if (error){
                            console.log (`Data seed tool: Failed to insert Concept ${concept.name} in database: ${error}`);
                            reject();
                        } else {
                            console.log (`Data seed tool: Concept ${concept.name} added to database. `);
                        }
                    });
                });
            } else {
                console.log ('Data seed tool: concepts database already seeded.');
            };
        }
    });
};

