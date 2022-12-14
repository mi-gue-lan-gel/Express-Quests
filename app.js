require("dotenv").config();

const express = require("express");
const handlers = require("./handlers");
const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");

const app = express();
const port = process.env.APP_PORT ?? 5000;

app.use(express.json());
// Public routes
app.get("/", handlers.welcome);
app.post("/api/login", handlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);
app.get("/api/movies", handlers.getMovies);
app.get("/api/movies/:id", handlers.getMovieById);
app.get("/api/users", handlers.getUser);
app.get("/api/users/:id", handlers.getUserById);
//Routes to protect
app.use(verifyToken);

app.post("/api/movies", handlers.postMovies);
app.put("/api/movies/:id", handlers.putMoviesById);
app.delete("/api/movies/:id", handlers.deleteMoviesById);
app.post("/api/users", hashPassword, handlers.postUser);
app.put("/api/users/:id", handlers.putUserById);
app.delete("/api/users/:id", handlers.deleteUserById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
