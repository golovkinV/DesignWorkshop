const db = require("../index");
const User = db.user;
const Tag = db.tag;
const Article = db.article
const noTag = "5fe72a74a769a41973d8e73c"

// All article
exports.findAll = (req, res) => {
    Article.find()
        .populate("tag")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Articles"
            });
        });
}

// Fetch article
exports.findOne = (req, res) => {
    const id = req.params.id;
    Article.findById(id)
        .populate("tag")
        .then(data => {
            if (!data)
                res.status(404).send({ message: `Not found Article with id=${id}` });
            else
                res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retrieving Article with id=${id}` });
        });
}

// Add article
exports.add = (req, res) => {
    const userId = req.params.userId;
    const articleParams = req.body
    const tagId = articleParams.tag ? articleParams.tag: noTag

    const article = new Article({
        title: articleParams.title,
        content: articleParams.content,
        image: articleParams.image,
        tag: tagId,
        user: userId
    })

    article.save(article)
        .then(data => {

            User.findByIdAndUpdate(userId, { $addToSet: { articles: [data.id ] } }, { useFindAndModify: false })
                .then(data => {})
                .catch(err => {
                    res
                        .status(500)
                        .send({
                            message: err.message || "Some error occurred while updating the User"
                        });
                });

            Tag.findByIdAndUpdate(tagId, { $addToSet: { articles: [data.id] } },{ useFindAndModify: false })
                .then(data => {})
                .catch(err => {
                    res
                        .status(500)
                        .send({
                            message: err.message || "Some error occurred while updating the Tag"
                        });
                });

            res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while creating the Article"
                });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;
    const article = req.body;
    const currentTag = article.currentTag;
    const newTag = article.data.tag
    Article.findByIdAndUpdate(id, article.data, { useFindAndModify: false })
        .then(data => {
            if (currentTag !== newTag) {
                Tag.findByIdAndUpdate(newTag, { $addToSet: { articles: [data.id] } }, { useFindAndModify: false })
                    .then(resp => {
                        Tag.findByIdAndUpdate(currentTag, { $pull: { articles: data.id } }, { useFindAndModify: false })
                            .then(resp => {
                                res.send(data)
                            })
                            .catch(err => {
                                res
                                    .status(500)
                                    .send({
                                        message: err.message || "Some error occurred while updating the Tag"
                                    });
                            });
                    })
                    .catch(err => {
                        res
                            .status(500)
                            .send({
                                message: err.message || "Some error occurred while updating the Tag"
                            });
                    });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while updating the Article"
                });
        });
}

// Delete article
exports.delete = (req, res) => {
    const id = req.params.id;
    Article.findByIdAndDelete(id, { useFindAndModify: false })
        .then(data => {
            User.findByIdAndUpdate(data.user, { $pull: { articles: id } }, { useFindAndModify: false })
                .then()
            Tag.findByIdAndUpdate(data.tag, { $pull: { articles: id } }, { useFindAndModify: false })
                .then()
            res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while deleting the Doc"
                });
        });
}
