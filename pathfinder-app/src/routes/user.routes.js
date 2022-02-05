const router = require('express').Router();
const db = require('../models/index');
const User = require('../models/users.model');
const userController = require('../controllers/user.controller');

module.exports = userRouter => {

    userRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
        // !!! Remember to re-add tokens to headers !!!
    });

    // Return all the users
    router.get("/", userController.findAll);

    // Return a single user
    router.get("/:id", userController.findOne);

    // Remove a user
    router.delete("/:id", userController.delete);

    userRouter.use('/api/user', router);
}