const express = require("express");
const app = express();
const { register, login } = require('./controllers/auth.controller');

const movieController = require('./controllers/movies.controller');
const showController = require('./controllers/shows.controller');

app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.post("/movies", movieController);
app.get('/shows', showController);

module.exports = app;