const express = require("express");

const app = express();

require("dotenv").config();

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const handlers = require("./handlers");

app.get("/api/movies", handlers.getMovies);
app.get("/api/movies/:id", handlers.getMovieById);
app.get("/api/users", handlers.getUsers);
app.get("/api/users/:id", handlers.getUsersById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
