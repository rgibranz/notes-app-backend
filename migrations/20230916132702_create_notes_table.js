/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function (knex) {
  return knex.schema.createTable('notes', function (table) {
    table.increments();
    table.string('title');
    table.text('content');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('notes.id').onUpdate('CASCADE').onDelete('CASCADE');
    table.timestamps();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('notes')
};
