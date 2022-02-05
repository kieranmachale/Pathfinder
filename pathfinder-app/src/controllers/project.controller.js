const Project = require('../models/project.model');
const { DATE } = require('sequelize');

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
exports.findAllForUser = (req, res) => {
    const id = req.params.uid;
    console.log(id);
    Project.findAll({where: {
        uid: id
    }})
        .then(data => {
            res.send(data).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retreiving user projects"
            })
        })
}
// -----------------------------------------------------------------------------------------------


/* Return a single project */
exports.findOne = (req, res) => {
    const userId = req.params.uid;
    const projectId = req.params.id;
    Project.findOne({where : {
        p_id: projectId, uid: userId
    }})
        .then(data => {
            res.send(data).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retreiving project with id" + projectId
            })
        })
}
// -----------------------------------------------------------------------------------------------


/* Update a project */
exports.update = (req, res) => {
    if(!req.body.name || !req.body.description || !req.body.width || !req.body.len){
        res.status(400).send({
            message: "Content cannot be missing!"
        });
        return
    }
    const projectId = req.params.id;
    const updatedProject = {
        name: req.body.name,
        description: req.body.description,
        width: req.body.width,
        length: req.body.len,
    }

    Project.update(updatedProject, {where: {
        p_id: projectId
    }})
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Project was updated successfully!"
                });
            } else {
                res.send({
                    message: `Cannot update the project with the id ${projectId}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating project with the id " + projectId
            })
        });
}
// -----------------------------------------------------------------------------------------------


/* Delete a project */
exports.delete = (req, res) => {
    // console.log("Inside the project controller");
    const projectId = req.params.id;
    Project.destroy({where: {
        p_id: projectId
    }})
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Project was deleted successfully!"
                })
            } else {
                res.send({
                    message: `The project with the id ${projectId} was not found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while deleting the project"
            })
        });
}