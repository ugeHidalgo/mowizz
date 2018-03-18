var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    HeroSchema = new Schema ({
        id : Number,
        name : String,
        username: String
    });

module.exports = moongoose.model ('Heroes', HeroSchema);