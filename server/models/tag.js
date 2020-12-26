module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const tagSchema = new Schema({
        name: String,
        articles: [{
            type: Schema.Types.ObjectId,
            ref: "Article",
        }]
    })

    tagSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("Tag", tagSchema);
};