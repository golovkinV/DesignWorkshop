module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const articleSchema = new Schema({
        title: String,
        content: String,
        image: String,
        tag: {
            type: Schema.Types.ObjectId,
            ref: "Tag"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    }, { timestamps: true })

    articleSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("Article", articleSchema);
};