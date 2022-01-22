const router = require('express').Router();

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
        res.send('Inside user routes!').status(200);
    });

    userRouter.use('/api/user', router);
}