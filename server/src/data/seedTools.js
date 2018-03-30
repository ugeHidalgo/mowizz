var seedAcountsTool = require ('./seedAccountsTool'),
    seedCostCentresTool = require ('./seedCostCentresTool'),
    defaultUser = 'ugehidalgo';

module.exports.seedSampleData = function () {
    
    seedAcountsTool.seedAccountsData(defaultUser);
    seedCostCentresTool.seedCostCentresData(defaultUser);
};

