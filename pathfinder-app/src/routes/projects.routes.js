const router = require('express').Router();
const Project = require('../models/project.model');

module.exports = projectRouter => {

    projectRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    // Return all projects
    router.get("/",(req, res) => {
        Project.findAll()
            .then(data => {
                res.send(data).status(200);
            })
            .catch(err => {console.log(err)});
    });

    projectRouter.use('/api/project', router);
}