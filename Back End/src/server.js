const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const server = express();
const PORT = process.env.PORT || 3000;
const url = process.env.URL || "http://localhost";

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
// ---------------------------------------------------------------

/* cors settings */
let corsOptions = {
    origin: [url + ":" + 8080, '*']
}

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
server.use(allowCrossDomain);
server.use(cors(corsOptions));

// ----------------------------------------------------------------

/* Endpoint to check server is active */
server.get("/", cors(), (req, res) => {
    res.json('Server is responsive').status(200);
});

/* Endpoint to check fetch API GET requests */
server.get("/test-get", cors(), (req, res) => {
    const data = {obj: {id:1, name:'obj1'}, obj2: {id:2, name:'obj2'}};
    res.json(data).status(200);
});


/* Endpoint to check fetch API POST requests */
server.post("/test-post", cors(), (req, res) => {
    console.log(req.body);
    res.json(req.body).status(200);
});

/* Start server */
server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

module.exports = server;
