let { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('notes').truncate()
  await knex('notes').insert([
    { title: faker.lorem.words(3), content: faker.lorem.sentences(3)}
  ]);
};
