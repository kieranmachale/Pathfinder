const router = require('express').Router();

module.exports = projectRouter => {

    projectRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/",(req, res) => {
        res.send('Inside project routes!').status(200);
    });

    projectRouter.use('/api/project', router);
}