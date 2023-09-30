const express = require("express");
const router = express.Router();
const moment = require("moment");

let knex = require("../knex");
let notes;

router.get("/", async (req, res) => {
  notes = await knex("notes").where("user_id", req.userData.id);
  res.json(notes);
});

router.get("/:id", async (req, res) => {
  notes = await knex("notes")
    .where({
      id: req.params.id,
      user_id: req.userData.id,
    })
    .first();

  if (!notes) {
    res.status(404);
    res.json({ message: "data not found" });
  }

  res.json(notes);
});

router.post("/", async (req, res) => {
  // TODO : create validation
  let data = {
    title: req.body.title,
    content: req.body.content,
    user_id: req.userData.id,
    created_at: moment().format("Y-M-d HH:m:s"),
  };

  notes = await knex("notes").insert(data);
  res.json(notes).status(201);
});

router.put("/:id", async (req, res) => {
  // TODO : create validation
  let data = {
    title: req.body.title,
    content: req.body.content,
    updated_at: moment().format("Y-M-d HH:m:s"),
  };

  notes = await knex("notes")
    .where({
      id: req.params.id,
      user_id: req.userData.id,
    })
    .update(data);
  res.json({ message: "data updated" }).status(201);
});

router.delete("/:id",async (req, res) => {
  await knex("notes")
    .where({
      id: req.params.id,
      user_id: req.userData.id,
    })
    .delete();

  res.json({ message: "data deleted" });
});

module.exports = router;
