const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/movie_generator",
  {
    logging: false,
  }
);

module.exports = db;
