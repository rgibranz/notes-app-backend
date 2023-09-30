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

  const token = jwt.sign({ email: user.email }, "GibranRahmat", {
    expiresIn: "24h",
  });

  res.json({ token });
});

router.post("/registration", async (req, res) => {
  // TODO : validation

  // check if email used or not
  let isUsed = await knex("users").where({email:req.body.email}).count();

  if(isUsed != 0){
    res.status(409).json({message:"email is used"});
    return;
  }

  // if not save new user
  await knex("users").insert({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });

  res.status(201).json({message:'you are registered'})
});

module.exports = router;
