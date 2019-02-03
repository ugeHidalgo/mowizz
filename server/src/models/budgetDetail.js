var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    BudgetDetailSchema = new Schema ({
        id : Number,
        transactionType : { type : Number, default : 2 },
        concept: { type: Schema.Types.ObjectId, ref: 'Concepts' },
        amount: Number,
        active : { type : Boolean, default : true },
        created : { type : Date, default : Date.now },
        updated : { type : Date, default : Date.now },
        username: String
    });

module.exports = moongoose.model ('BudgetDetails', BudgetDetailSchema);