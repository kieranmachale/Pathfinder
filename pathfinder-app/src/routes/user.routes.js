const router = require('express').Router();
const db = require('../models/index');
const User = require('../models/users.model');

module.exports = userRouter => {

    userRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    // Return all the users
    router.get("/",(req, res) => {
        User.findAll()
            .then(user => {
                //console.log(user);
                res.send(user).status(200);
            })
            .catch(err => {console.log(err)});
    });

    userRouter.use('/api/user', router);
}