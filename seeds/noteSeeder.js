import { faker } from '@faker-js/faker';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('notes').truncate();
  
  // insert data
  await knex('notes').insert([
    { title: faker.lorem.words(3), content: faker.lorem.sentences(3)}
  ]);
}
