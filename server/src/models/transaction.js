var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    TransactionSchema = new Schema ({
        id : Number,
        transactionType : { type : Number, default : 2 },
        date : { type : Date, default : Date.now },
        /* account: { type: Schema.Types.ObjectId, ref: 'Accounts' },
        costCentre: { type: Schema.Types.ObjectId, ref: 'CostCentres' },
        concept: { type: Schema.Types.ObjectId, ref: 'Concepts' }, */
        amount: Number,
        comments: String,
        username : String
    });

module.exports = moongoose.model ('Transactions', TransactionSchema);