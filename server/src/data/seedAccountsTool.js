var accountsSeedData = require ('./seedData/accountsSeedData'),
    mongoose = require ('mongoose'),
    Account = require ('../models/account');

module.exports.seedAccountsData = function (defaultUser) {
    
    return new Promise (function (resolve, reject ){

        var accounts, 
            newAccount, 
            f = accountsSeedData.initialAccounts.length;

        console.log ('(1-START) Data seed tool: Checking if account data exist for user: ' + defaultUser);
        Account.find ({username: defaultUser}, function(error, accounts) {
            if (error){
                console.log ('(1-END) Data seed tool: Failed to count accounts in database: ' + error);
                reject();
            } else {
                if (accounts.length === 0) {
                    console.log ('(1) Data seed tool: Seeding accounts data into database.');
                    accountsSeedData.initialAccounts.forEach (function (account) {
                        newAccount = new Account(account);
                        newAccount.username = defaultUser;
                        newAccount.save(function (error){
                            if (error){
                                console.log (`(1-REJECT) Data seed tool: Failed to insert account ${account.name} in database: ${error}`);
                                reject();
                            } else {
                                console.log (`(1) Data seed tool: Account ${account.name} added to database. `);
                                f--;
                                if (f===0){
                                    console.log ('(1-END) Data seed tool: Accounts database seeding finished.');
                                    resolve();
                                }
                            }
                        });
                    });
                } else {
                    console.log ('(1-END) Data seed tool: Accounts database already seeded.');
                    resolve();
                };
            }
        });
    });
};

