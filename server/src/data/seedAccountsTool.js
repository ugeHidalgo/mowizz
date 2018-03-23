var accountsSeedData = require ('./seedData/accountsSeedData'),
    mongoose = require ('mongoose'),
    Account = require ('../models/account');

module.exports.seedAccountsData = function (defaultUser) {
    
    var accounts, newAccount;

    console.log ('Data seed tool: Checking if account data exist for user: ' + defaultUser);
    Account.find ({username: defaultUser}, function(error, accounts) {
        if (error){
            console.log ('Data seed tool: Failed to count accounts in database: ' + error);
        } else {
            if (accounts.length === 0) {
                console.log ('Data seed tool: Seeding accounts data into database.');
                accountsSeedData.initialAccounts.forEach (function (account) {
                    newAccount = new Account(account);
                    newAccount.save(function (error){
                        if (error){
                            console.log (`Data seed tool: Failed to insert account ${account.name} in database: ${error}`);
                            reject();
                        } else {
                            console.log (`Data seed tool: Account ${account.name} added to database. `);
                        }
                    });
                });
            } else {
                console.log ('Data seed tool: Accounts database already seeded.');
            };
        }
    });
};

