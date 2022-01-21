const router = require('express').Router();

module.exports = arduinoRouter => {

    arduinoRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    // Return all the arduinos
    router.get("/",(req, res) => {
        res.send('Inside arduino routes!').status(200);
    });

    arduinoRouter.use('/api/arduino', router);
}