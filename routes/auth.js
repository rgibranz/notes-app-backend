const express = require("express");
const router = express.Router();

const knex = require("../knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');

const loginValidation = [
  body('email').isEmail(),
  body('password').notEmpty(),
];

router.post("/login", loginValidation, async (req, res) => {
  // Periksa apakah ada kesalahan validasi
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

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

const registrationValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
];

router.post("/registration",registrationValidation, async (req, res) => {
  // Periksa apakah ada kesalahan validasi
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // check if email used or not
  let isUsed = await knex("users").where({email:req.body.email}).count();

  if(isUsed != 0){
    res.status(409).json({error:"email is used"});
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
