var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    BudgetSchema = new Schema ({
        id : Number,
        name : String,
        description: String,
        active : { type : Boolean, default : true },
        created : { type : Date, default : Date.now },
        updated : { type : Date, default : Date.now },
        username: String,
        startDate: { type : Date, default : Date.now },
        endDate: { type : Date, default : Date.now },
        amount: Number,
        budgetDetails: [ { type: Schema.Types.ObjectId, ref: 'BudgetDetails' } ]
    });

module.exports = moongoose.model ('Budgets', BudgetSchema);