const argon2 = require("argon2");

const hashPassword = (req, res, next) => {
  // hash the password using argon2 then call next()
  argon2
    .hash(req.body.password, {
      type: argon2.argon2id,
      timeCost: 2,
      parallelism: 1
    })
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      console.log('hashedPassword:', hashedPassword);
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.log('Hash is not done yet');
      res.sendStatus(500);
    })
};

module.exports = {
  hashPassword,
};