const { DATE } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('./index');

const Report = db.define("report", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uid:{
        type: Sequelize.INTEGER      
    },
    type: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
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
    tableName: "pf_issue_reports",
    schema: "pathfinder"
});

module.exports = Report;