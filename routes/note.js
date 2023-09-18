const express = require('express')
const router = express.Router()
const moment = require('moment')

let knex = require('../knex');
let notes;

router.get('/', async (req, res) => {
  notes = await knex('notes');
  res.json(notes);
});

router.get('/:id', async (req, res) => {
  notes = await knex('notes').where('id', req.params.id).first();

  if (notes === undefined) {
    res.status(404);
    res.json({'message': "data not found"});
  }

  res.json(notes);
});

router.post('/', async (req, res) => {
  let data = {
    title: req.body.title,
    content: req.body.content,
    created_at: moment().format('Y-M-d HH:m:s')
  }

  notes = await knex('notes').insert(data);
  res.json(notes).status(201);
});

router.put('/:id', async (req, res) => {
  let data = {
    title: req.body.title,
    content: req.body.content,
    updated_at: moment().format('Y-M-d HH:m:s')
  }

  notes = await knex('notes').where('id', req.params.id).update(data);
  res.json({'message': 'data updated'}).status(201);
});

router.delete('/:id', (req, res) => {
  knex('notes').where('id', req.params.id).delete();
  res.json({'message': 'data deleted'});
});

module.exports = router