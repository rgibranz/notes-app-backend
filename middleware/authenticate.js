const jwt = require("jsonwebtoken");
const knex = require('../knex');

async function authenticate(req, res, next) {
  const token = req.header("Authorization");

  if (token) {
    try {
      const decode = jwt.verify(token, "GibranRahmat");
      const user = await knex('users').where('email',decode.email).first();
      req.userData = user;
    } catch (error) {
      res.status(401).json({message:'Not Valid'})
    }
  } else {
    res.status(401).json({ message: "Not Login" });
  }

  next();
}

module.exports = authenticate;