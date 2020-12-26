module.exports = app => {
    const tagController = require("../controllers/tag.controller");

    const router = require("express").Router();

    // Add tag
    router.post("/add", tagController.add);

    // All tags
    router.get("/all", tagController.findAll);

    // Fetch tag
    router.get("/:id", tagController.findOne)

    app.use('/api/tag', router);
};