const { DATE } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('./index');

const Project = db.define("project", {
    p_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    public: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    width: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    length: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    uid: {
        type: Sequelize.INTEGER
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
    tableName: "pf_projects",
    schema: "pathfinder"
});

module.exports = Project;