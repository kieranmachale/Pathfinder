const User = require('../models/users.model');

/* Return all users from the database */
exports.findAll = (req, res) => {
    console.log("Inside user controller");
    User.findAll({attributes: [
        "uid", "username", "email", "password", "createdat", "updatedat"
    ]})
        .then(user => {
            res.send(user).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred when retreiving the users"
            })
        })
}
// -----------------------------------------------------------------------------------------------

/* Find a single user by primary key */
exports.findOne = (req, res) => {
    console.log("Inside user controller");
    const uid = req.params.id;
    User.findByPk(uid)
        .then(user => {
            if(user){
                res.send(user).status(200);
            } else {
                res.status(500).send({
                    message: "No user with the id " + uid 
                });
            }    
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving user with the id " + uid
            });
        });
}
// -----------------------------------------------------------------------------------------------

/* Remove a single user from the database */
exports.delete = (req, res) => {
    const id = req.params.id;
    console.log("Inside user controller");
    User.destroy({
        where: {uid: id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete the user with the id ${id}`
                });
            }
        })
        .catch(err => {
            res.send({
                message: err.message ||  "Could not delete the user with the id " + id
            })
        });
}