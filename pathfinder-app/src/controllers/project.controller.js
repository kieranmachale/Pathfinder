const Project = require('../models/project.model');

/* Create a new project and add it to the database */
exports.create = (req, res) => {
    if(!req.body.name || !req.body.width || !req.body.len || !req.body.uid){
        res.status(400).send({
            message: "Content cannot be missing!"
        });
        return
    }  
    
    const newProject = {
        name: req.body.name,
        description: req.body.description,
        public: req.body.public,
        width: req.body.width,
        length: req.body.len,
        uid: req.body.uid,
    }
    console.log("Template data created");

    Project.create(newProject)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred when trying to create the project"
            })
        })
}
// -----------------------------------------------------------------------------------------------

/* Return all projects from the database */
exports.findAll = (req, res) => {
    Project.findAll({attributes: [
        "p_id", "name", "description", "public", "width", "length", "uid"
    ]})
        .then(project => {
            res.send(project).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while retreiving the projects"
            });
        });
}
// -----------------------------------------------------------------------------------------------

/* Return all public projects */
exports.findPublic = (req, res) => {
    Project.findAll({
        where: {public: "true"}
    })
        .then(project => {
            res.send(project).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while retreiving the projects"
            });
        });
}
// -----------------------------------------------------------------------------------------------


/* Return all projects for a single user */



/* Return a single project */



/* Update a project */



/* Delete a project */