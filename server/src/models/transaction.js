var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    TransactionSchema = new Schema ({
        id : Number,
        transactionType : { type : Number, default : 2 },
        date : { type : Date, default : Date.now },
        concept: { type: Schema.Types.ObjectId, ref: 'Concepts' },
        costCentre: { type: Schema.Types.ObjectId, ref: 'CostCentres' },
        account: { type: Schema.Types.ObjectId, ref: 'Accounts' },
        amount: Number,
        accountAmount: Number,
        comments: String,
        username : String
    });

module.exports = moongoose.model ('Transactions', TransactionSchema);