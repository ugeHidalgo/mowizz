var seedAcountsTool = require ('./seedAccountsTool'),
    defaultUser = 'ugehidalgo';

module.exports.seedSampleData = function () {
    
    seedAcountsTool.seedAccountsData(defaultUser);
};

