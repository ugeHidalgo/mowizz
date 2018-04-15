var seedAcountsTool = require ('./seedAccountsTool'),
    seedCostCentresTool = require ('./seedCostCentresTool'),
    seedConceptsTool = require ('./seedConceptsTool'),
    defaultUser = 'ugehidalgo';

module.exports.seedSampleData = function () {
    
    seedAcountsTool.seedAccountsData(defaultUser);
    seedCostCentresTool.seedCostCentresData(defaultUser);
    seedConceptsTool.seedConceptsData(defaultUser);
};

