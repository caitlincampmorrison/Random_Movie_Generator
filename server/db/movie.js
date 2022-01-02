const db = require('./db')
const Sequelize = require("sequelize");
const { STRING, INTEGER, UUID, UUIDV4, CHAR } = Sequelize.DataTypes;

const Movie = db.define('movie', {
    title: {
        type: STRING
    },
    stars: {
        type: INTEGER
    }
})

module.exports = Movie