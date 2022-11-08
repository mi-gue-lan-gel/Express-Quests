const database = require("./database");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("select * from movies where id = ?", [id])
    .then(([movie]) => {
      if (movie.toString() != "") {
        res.json(movie);
      } else {
        res.status(404).send("Not Found")
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`This ${err} ocurred`)
    });
};

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("select * from users where id = ?", [id])
    .then(([user]) => {
      if (user.toString() != "") {
        res.status(200).json(user);
      } else {
        res.status(404).send("Not Found")
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`This ${err} ocurred`)
    });
};

const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?,?,?,?,?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      console.log(result);
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the data");
    });
};

module.exports = {
  welcome,
  getMovies,
  getMovieById,
  getUsers,
  getUsersById,
  postUsers
};
