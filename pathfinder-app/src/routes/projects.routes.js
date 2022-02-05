const router = require('express').Router();
const Project = require('../models/project.model');
const projectController = require('../controllers/project.controller');

module.exports = projectRouter => {

    projectRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    // Return all projects
    router.get("/", projectController.findAll);

    // Return all public projects
    router.get("/public", projectController.findPublic);

    // Return all projects for a single user
    router.get("/:uid", projectController.findAllForUser);

    // Return a single project
    router.get("/:uid/:id", projectController.findOne);

    // Create a new project
    router.post("/", projectController.create);

    // Update a project
    router.patch("/:id", projectController.update);

    // Delete a project
    router.delete("/:id", projectController.delete);

    projectRouter.use('/api/project', router);
}