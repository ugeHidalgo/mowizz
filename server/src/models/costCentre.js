var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    CostCentreSchema = new Schema ({
        id : Number,
        name : String,
        description: String,
        active : { type : Boolean, default : true },
        created : { type : Date, default : Date.now },
        updated : { type : Date, default : Date.now },
        comments: String,
        username : String
    });

module.exports = moongoose.model ('CostCentres', CostCentreSchema);