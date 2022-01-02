const app = require("express").Router();

app.use("/movies", require("./movie"));

module.exports = app;
