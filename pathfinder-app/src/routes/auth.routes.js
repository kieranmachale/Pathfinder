const router = require('express').Router();
const authenticationController = require('../controllers/auth.controller');
const registerCheck = require('../middleware/registerCheck');

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

    // Register a new user
    router.post("/register", [registerCheck.checkUniqueUsernameEmail], authenticationController.register);

    // Login to user account
    router.post("/login", authenticationController.login);

    authenticationRouter.use('/api/auth', router);
}