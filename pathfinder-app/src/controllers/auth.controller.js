const User = require('../models/users.model');
const dotenv = require('dotenv');
const config = require('../config/auth.config');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let accessTokenTimeout = 86400;

// Register new user
exports.register = (req, res) => {

    // Validate request
    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({message: "Required data must be present"});
    // Regular expression to check validity of email address
    } else if (!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/.test(req.body.email))) {
        return res.status(400).json({message: "Email address is not valid!"});
    }

    // Check lengths of fields
    if (req.body.email.length > 128 || req.body.password.length > 128) {
        return res.status(413).json({
            message: "Field too long."
        });
    }

    // Create a new user
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
        .then(data => {

            // Sign web token
            let accessToken = jwt.sign({id: data.uid}, config.ACCESS_TOKEN_SECRET, {
                expiresIn: accessTokenTimeout // 24 hours
            });

            // Login
            let response = {
                uid: data.uid,
                username: data.username,
                email: data.email,
                jwt: accessToken
            }
            // Return data
            res.send(response).status(201);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while creating new user!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------


// Login to user account
exports.login = (req, res) => {
    console.log("We're inside login");

    // Validate request
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({message: "All data required!"});
    }

    User.findOne({where: {email: req.body.email}})
        .then(user => {
            //console.log(user);
            if (!user) {
                return res.status(401).send({message: "Invalid email or password."});
            }

            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({message: "Invalid email or password."});
            }

            let accessToken = jwt.sign({id: data.uid}, config.ACCESS_TOKEN_SECRET, {
                expiresIn: accessTokenTimeout // 24 hours
            });

            // Save JWT to whitelist
            res.status(200).send({
                id: user.uid,
                username: user.username,
                email: user.email,
                jwt: accessToken
            });

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while loggin the user in"});
        });

};