/* Tests on C.R.U.D operations */
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/server.js");
let auth = require("../src/controllers/auth.controller");

chai.use(chaiHttp);
var expect = chai.expect;

// Init-user data
let email = "testuser@test.si";
let password = "testuser"
let userID = 129;
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI5LCJpYXQiOjE2MTg1NDQyODAsImV4cCI6MTY1MDEwMTIwNn0.qZ1dPYOsviXpOSPk3JGB6WupREXBAFoKoGz3HQp8qZ8";
let testToken;
let appReminderID = 25;
let medReminderID = 52;
let linkerID;
let linkedID;
let test = 1;

// Authentication ------------------------------------------------------------------------------------------------------
describe('Authentication tests', () => {

    // User vars
    let r = Math.random().toString(36).substring(7);
    let testUserEmail = r + '@gmail.com';

    //register
    it('Register User', (done) => {
        let user = {
            'email': testUserEmail,
            'password': "qwerty",
            'username':'unittest'
        }
        chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
            });
        done();
    });

    
    it('Register User with invalid password ', (done) => {
        let r = Math.random().toString(36).substring(7);
        let testUserEmail = r + '@gmail.com';
        let password = Math.random().toString(36).substring(60);
        let user = {
            'email': testUserEmail,
            'password': password
        }
        chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end((err, res) => {
                chai.expect(res.status).to.equal(400);
            });
        done();
    });

    it('Register User wrong email syntax ', (done) => {

        let user = {
            'email': 'test',
            'password': 'qwerty'
        }
        chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end((err, res) => {
                chai.expect(res.status).to.equal(400);
            });
        done();
    });

    //login
    it('Login without email', (done) => {
        let user = {
            'email': '',
            'password': 'qwerty',
        }
        chai.request(server)
            .post('/api/auth/login')
            .send(user)
            .end((err, res) => {
                chai.expect(res.status).to.equal(400);
            });
        done();
    });
    it('Login without password', (done) => {
        let user = {
            'email': testUserEmail,
            'password': '',
        }
        chai.request(server)
            .post('/api/auth/login')
            .send(user)
            .end((err, res) => {
                chai.expect(res.status).to.equal(400);
            });
        done();
    });

    /*
    it('Login correctly', (done) => {
        let user = {
            "email": email,
            "password": password
        }
        chai.request(server)
            .post('/api/auth/login')
            .send(user)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
            });
        done();
    });*/
    
    // logout
    /*it('Logout correctly', (done) => {
        chai.request(server)
            .get('/api/auth/logout')
            .set('x-access-token', testToken)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
            });
        done();
    });*/


});