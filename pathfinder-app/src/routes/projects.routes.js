const router = require('express').Router();
const Project = require('../models/project.model');
const projectController = require('../controllers/project.controller');
const authJWT = require('../middleware/authJWT');

module.exports = projectRouter => {

    projectRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    // Return all projects
    router.get("/", [authJWT.verifyToken], projectController.findAll);

    // Return all public projects
    router.get("/public", projectController.findPublic);

    // Return all projects for a single user
    router.get("/:uid", [authJWT.verifyToken], projectController.findAllForUser);

    // Return a single project
    router.get("/:uid/:id", [authJWT.verifyToken], projectController.findOne);

    // Create a new project
    router.post("/", [authJWT.verifyToken], projectController.create);

    // Update a project
    router.patch("/:id", [authJWT.verifyToken], projectController.update);

    // Delete a project
    router.delete("/:id", [authJWT.verifyToken], projectController.delete);

    projectRouter.use('/api/project', router);
}