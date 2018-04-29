var transactionsSeedData = require ('./seedData/transactionsSeedData'),
    mongoose = require ('mongoose'),
    Transaction = require ('../models/transaction');

module.exports.seedTransactionsData = function (defaultUser) {

    return new Promise (function (resolve, reject ){
    
        var concepts, 
            newTransaction,
            f = transactionsSeedData.initialTransactions.length;

        console.log ('(4-START) Data seed tool: Checking if transactions data exist for user: ' + defaultUser);
        Transaction.find ({username: defaultUser}, function(error, transactions) {
            if (error){
                console.log ('(4-END) Data seed tool: Failed to count transactions in database: ' + error);
                reject();
            } else {
                if (transactions.length === 0) {
                    console.log ('(4) Data seed tool: Seeding transactions data into database.');
                    transactionsSeedData.initialTransactions.forEach (function (transaction) {
                        newTransaction = new Transaction(transaction);
                        newTransaction.username = defaultUser;
                        newTransaction.save(function (error){
                            if (error){
                                console.log (`(4-END) Data seed tool: Failed to insert transaction ${transaction.name} in database: ${error}`);
                                reject();
                            } else {
                                console.log (`(4) Data seed tool: Transaction ${transaction.name} added to database. `);
                                f--;
                                if ( f === 0 ){
                                    console.log ('(4-END) Data seed tool: Concepts database seeding finished.');
                                    resolve();
                                }
                            }
                        });
                    });
                } else {
                    console.log ('(4-END) Data seed tool: Transactions database already seeded.');
                    resolve();                    
                };                
            }
        });
    });
};

