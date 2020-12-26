const db = require("../index")
const Tag = db.tag
const noTag = "5fe72a74a769a41973d8e73c"

// All tags
exports.findAll = (req, res) => {
    Tag.find()
        .populate("articles")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message || "Some error occurred while retrieving Tags" });
        });
};

// Add tag
exports.add = (req, res) => {
    const tagParams = req.body
    const tag = new Tag({
        name: tagParams.name
    })

    tag.save(tag)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while creating the Tag"
                });
        });
};

// Fetch tag
exports.findOne = (req, res) => {
    const id = req.params.id;
    Tag.findById(id)
        .populate("articles")
        .then(data => {
            if (!data)
                res
                    .status(404)
                    .send({ message: `Not found Tag with id=${id}` });
            else
                res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retrieving Tag with id=${id}` });
        });
};