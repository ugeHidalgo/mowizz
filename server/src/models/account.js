var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    AccountSchema = new Schema ({
        id : Number,
        name : String,
        iban: String,
        active : { type : Boolean, default : true },
        created : { type : Date, default : Date.now },
        updated : { type : Date, default : Date.now },
        comments: String,
        username : String
    });

module.exports = moongoose.model ('Accounts', AccountSchema);