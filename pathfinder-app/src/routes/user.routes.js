const router = require('express').Router();
const db = require('../models/index');
const authJWT = require("../middleware/authJWT");
const userController = require('../controllers/user.controller');

module.exports = userRouter => {

    userRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "token, Origin, Content-Type, Accept"
        );
        next();
        // !!! Remember to re-add tokens to headers !!!
    });

    // Return all the users
    router.get("/", [authJWT.verifyToken], userController.findAll);

    // Return a single user
    router.get("/:id", [authJWT.verifyToken], userController.findOne);

    // Remove a user
    router.delete("/:id", [authJWT.verifyToken], userController.delete);

    userRouter.use('/api/user', router);
}