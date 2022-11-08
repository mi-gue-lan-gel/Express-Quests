require("dotenv").config();

const express = require("express");
const handlers = require("./handlers");

const app = express();
const port = process.env.APP_PORT ?? 5000;

app.use(express.json());

app.get("/", handlers.welcome);
app.get("/api/movies", handlers.getMovies);
app.get("/api/movies/:id", handlers.getMovieById);
app.post("/api/movies", handlers.postMovies);
app.put("/api/movies/:id", handlers.putMoviesById);
app.delete("/api/movies/:id", handlers.deleteMoviesById);

app.get("/api/users", handlers.getUsers);
app.get("/api/users/:id", handlers.getUsersById);
app.post("/api/users", handlers.postUsers);
app.put("/api/users/:id", handlers.putUsersById);
app.delete("/api/users/:id", handlers.deleteUsersById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
