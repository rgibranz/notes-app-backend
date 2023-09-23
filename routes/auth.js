const express = require("express");
const router = express.Router();

const knex = require("../knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  let user = await knex("users").where("email", req.body.email).first();

  if (!user) {
    res.status(401).json({ error: "data not found" });
  }

  if (!bcrypt.compare(req.body.password, user.password)) {
    res.status(401).json({ error: "data not found" });
  }

  const token = jwt.sign({email:user.email},'GibranRahmat',{expiresIn:'24h'});

  res.json({token});
});

module.exports = router;