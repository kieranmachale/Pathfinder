const Report = require('../models/reports.model');
const dotenv = require('dotenv');
const config = require('../config/auth.config');

// Register new user
exports.submitReport = (req, res) => {

    // Create a new user
    Report.create({
        type: req.body.type,
        description: req.body.description,
        uid: req.body.uid
    })
        .then(data => {
            res.send("Report submitted").status(201);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while submitting report!"
            });
        });
};