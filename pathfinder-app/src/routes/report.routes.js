const router = require('express').Router();
const db = require('../models/index');
const authJWT = require("../middleware/authJWT");
const reportController = require('../controllers/report.controller');

module.exports = reportRouter => {

    reportRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "token, Origin, Content-Type, Accept"
        );
        next();
        
    });

    // Return all the users
    router.post("/", [authJWT.verifyToken], reportController.submitReport);

    reportRouter.use('/api/report', router);
}