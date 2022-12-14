require("dotenv").config();

const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

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

const verifyPassword = (req, res) => {
  // Generate json web token
  const token = jwt.sign({ sub: req.user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  // Verify the password using argon2
  argon2
    .verify(req.user[0].hashedPassword, req.body.password)
    .then((verifiedPassword) => {
      verifiedPassword ?
        res.send({ token: token }) && delete req.user :
        res.sendStatus(401);
    })
    .catch((err) => {
      console.log(`This ${err} happened`);
      res.sendStatus(500);
    })
};

const verifyToken = (req, res, next) => {
  // Verify json web token
  try {
    const header = req.get("Authorization");
    console.log(header);
    if (header == undefined) {
      throw new Error("Header is missing");
    }
    const [type, token] = header.split(" ");
    if (type !== "Bearer") {
      throw new Error("Type is not Bearer");
    }
    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log(`${err}`);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken
};