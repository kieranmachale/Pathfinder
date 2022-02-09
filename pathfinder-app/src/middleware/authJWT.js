const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

// Verify token in whitelist
verifyToken = (req, res, next) => {

    let accessToken = req.headers["token"];
    // check token existence
    if (!accessToken) {
        return res.status(403).send({message: "No token provided!"});
    }

    // verify token
    jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET, (err, decoded) => {
        // Invalid token
        if (err) {
            return res.status(401).send({message: "Unauthorized!"});
        }
        // Save token id in request
        req.params.tokenId = decoded.id

        next();
    })
};
//--------------------------------------------------------------------------------------------------------------

const authJwt = {
    verifyToken: verifyToken
};
module.exports = authJwt;
