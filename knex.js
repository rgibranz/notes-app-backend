let conf = require('./knexfile');
const knex = require('knex')(conf.development);
module.exports = knex