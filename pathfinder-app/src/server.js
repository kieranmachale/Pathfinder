const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require('path');
const server = express();

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "http://localhost";

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Setting up relative paths for static files
server.use(express.static(__dirname + "/public/css"));
server.use(express.static(__dirname + "/public/js"));
server.use(express.static(__dirname + "/public/images"));
server.use(express.static(__dirname + "/public/html"));

// ---------------------------------------------------------------

/* cors settings */
let corsOptions = {
    origin: [URL + ":" + 8080, '*'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
server.use(allowCrossDomain);
server.use(cors(corsOptions));

// ----------------------------------------------------------------

/* Routes */
//require("./routes/test.routes")(server)
require("./routes/user.routes")(server);
require("./routes/auth.routes")(server);
require("./routes/projects.routes")(server);
require("./routes/arduino.routes")(server);

// ----------------------------------------------------------------

/* Checking connection to ElephantSQL database */
const db = require('./models/index');
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => {console.log(err)});



// ----------------------------------------------------------------

/* Endpoint to check server is active */
server.get("/api/", cors(), (req, res) => {
    res.json('Server is running').status(200);
});

/* Endpoint to check fetch API GET requests */
server.get("/api/test-get", cors(), (req, res) => {
    const data = {obj: {id:1, name:'obj1'}, obj2: {id:2, name:'obj2'}};
    res.json(data).status(200);
});

/* Endpoint to check fetch API POST requests */
server.post("/api/test-post", cors(), (req, res) => {
    console.log(req.body);
    res.json(req.body).status(200);
});

/* Web page endpoints */
server.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/html/login.html");
});

server.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/html/registration.html");
});

server.get("/profile", (req, res) => {
    res.sendFile(__dirname + "/public/html/profile.html");
});

// ---------------------------------------------------------------

/* Start server */
server.listen(PORT, () => {
    console.log(`Server running on: ${URL}:${PORT}`);
});

module.exports = server;
