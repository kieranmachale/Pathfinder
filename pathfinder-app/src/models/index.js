const dbConfig = require("../config/db.config.js");
const Sequelize = require('sequelize');

module.exports = new Sequelize(dbConfig.USER, dbConfig.DB, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: '0',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});