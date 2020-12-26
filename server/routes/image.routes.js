module.exports = app => {
    const imageController = require("../controllers/image.controller");

    const router = require("express").Router();

    // Upload image
    router.post("/upload", imageController.uploadImage);

    app.use('/api/image', router);
};