module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const roleSchema = new Schema({
        name: String,
        users: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }]
    })

    roleSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("Role", roleSchema);
};