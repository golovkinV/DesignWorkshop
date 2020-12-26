module.exports = app => {
    const articleController = require("../controllers/article.controller");

    const router = require("express").Router();

    // All articles
    router.get("/all", articleController.findAll)

    // Fetch article
    router.get("/:id", articleController.findOne)

    //Delete document
    router.delete("/:id", articleController.delete)

    // Add article
    router.post("/:userId", articleController.add);

    // Update article
    router.put("/:id", articleController.update)

    app.use('/api/article', router);
};