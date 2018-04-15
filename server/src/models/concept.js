var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    ConceptSchema = new Schema ({
        id : Number,
        name : String,
        description : String,
        transactionType : { type : Number, default : 2 },
        active : { type : Boolean, default : true },
        created : { type : Date, default : Date.now },
        updated : { type : Date, default : Date.now },
        comments: String,
        username : String
    });

module.exports = moongoose.model ('Concepts', ConceptSchema);