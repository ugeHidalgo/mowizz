var seedAcountsTool = require ('./seedAccountsTool'),
    seedCostCentresTool = require ('./seedCostCentresTool'),
    seedConceptsTool = require ('./seedConceptsTool'),
    seedTransactionTool = require ('./seedTransactionsTool'),
    defaultUser = 'ugehidalgo';

module.exports.seedSampleData = function () {
    
    let seedAcounts = seedAcountsTool.seedAccountsData(defaultUser),
        seedCostCentres = seedCostCentresTool.seedCostCentresData(defaultUser),
        seedConcepts = seedConceptsTool.seedConceptsData(defaultUser);
        // seedTransactions = seedTransactionTool.seedTransactionsData(defaultUser);

    seedAcounts.then( function () {
        seedCostCentres.then( function () {
            seedConcepts.then( function () {
                // seedTransactions.then ( function () {
                    console.log ('Data seed tool: All data bases successfully seeded.');
                // });
            });
        });
    });
};

