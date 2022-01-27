const { DATE } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('./index');

const User = db.define("user", {
    uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdat : {
        type: Sequelize.DATE,
        allowNull: true
    },
    updatedat: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: "pf_users",
    schema: "pathfinder"
});

module.exports = User;