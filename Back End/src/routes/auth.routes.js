const router = require('express').Router();

module.exports = authenticationRouter => {

    authenticationRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/",(req, res) => {
        res.send('Inside auth routes!').status(200);
    });

    authenticationRouter.use('/api/auth', router);
}