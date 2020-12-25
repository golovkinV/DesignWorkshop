module.exports = app => {
    const roleController = require("../controllers/role.controller");

    const router = require("express").Router();

    // Add role
    router.post("/add", roleController.add);

    // Delete role
    router.delete("/:id", roleController.delete);

    // All roles
    router.get("/all", roleController.findAll);

    // Fetch role
    router.get("/:id", roleController.findOne)

    app.use('/api/role', router);
};