var transactionsSeedData = require ('./seedData/transactionsSeedData'),
    mongoose = require ('mongoose'),
    Transaction = require ('../models/transaction');

module.exports.seedTransactionsData = function (defaultUser) {

    return new Promise (function (resolve, reject ){
    
        var concepts, 
            newConcept,
            f = transactionsSeedData.initialTransactions.length;

        console.log ('(4-START) Data seed tool: Checking if transactions data exist for user: ' + defaultUser);
        Transaction.find ({username: defaultUser}, function(error, concepts) {
            if (error){
                console.log ('(4-END) Data seed tool: Failed to count transactions in database: ' + error);
                reject();
            } else {
                if (concepts.length === 0) {
                    console.log ('(4) Data seed tool: Seeding transactions data into database.');
                    /* conceptsSeedData.initialConcepts.forEach (function (concept) {
                        newConcept = new Concept(concept);
                        newConcept.username = defaultUser;
                        newConcept.save(function (error){
                            if (error){
                                console.log (`Data seed tool: Failed to insert Concept ${concept.name} in database: ${error}`);
                                reject();
                            } else {
                                console.log (`Data seed tool: Concept ${concept.name} added to database. `);
                                resolve();
                            }
                        });
                    }); */
                } else {
                    console.log ('(4-END) Data seed tool: Transactions database already seeded.');
                    resolve();                    
                };
                console.log ('(4-END) Data seed tool: Transactions database seeding finished.');
                resolve();
            }
        });
    });
};

