var conceptsSeedData = require ('./seedData/conceptsSeedData'),
    mongoose = require ('mongoose'),
    Concept = require ('../models/Concept');

module.exports.seedConceptsData = function (defaultUser) {

    return new Promise (function (resolve, reject ){
    
        var concepts, 
            newConcept, 
            f = conceptsSeedData.initialConcepts.length;

        console.log ('(2-START) Data seed tool: Checking if concept data exist for user: ' + defaultUser);
        Concept.find ({username: defaultUser}, function(error, concepts) {
            if (error){
                console.log ('(2-END) Data seed tool: Failed to count concepts in database: ' + error);
                reject();
            } else {
                if (concepts.length === 0) {
                    console.log ('(2) Data seed tool: Seeding concepts data into database.');
                    conceptsSeedData.initialConcepts.forEach (function (concept) {
                        newConcept = new Concept(concept);
                        newConcept.username = defaultUser;
                        newConcept.save(function (error){
                            if (error){
                                console.log (`(2-END) Data seed tool: Failed to insert Concept ${concept.name} in database: ${error}`);
                                reject();
                            } else {
                                console.log (`(2) Data seed tool: Concept ${concept.name} added to database. `);
                                f--;
                                if (f===0){
                                    console.log ('(2-END) Data seed tool: Concepts database seeding finished.');
                                    resolve();
                                }
                            }
                        });
                    });
                } else {
                    console.log ('(2-END) Data seed tool: Concepts database already seeded.');
                    resolve();                    
                };
            }
        });
    });
};

