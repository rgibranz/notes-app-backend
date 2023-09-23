/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function (knex) {
  return knex.schema.createTable('notes', function (table) {
    table.increments();

    table.integer('user_id').unsigned();
    table.string('title');
    table.text('content');

    table.foreign('user_id').references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

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
