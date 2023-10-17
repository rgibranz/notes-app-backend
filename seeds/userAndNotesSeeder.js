let { faker } = require("@faker-js/faker");
let bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  for (let i = 0; i < 15; i++) {
    let user = await knex("users").insert([
      {
        name: "User " + i,
        email: `user${i}@gmail.com`,
        password: await bcrypt.hash("ada", 10),
      },
    ]);

    for (let j = 0; j < 15; j++) {
      // insert data
      await knex("notes").insert([
        {
          user_id: user,
          title: faker.lorem.words(3),
          content: faker.lorem.sentences(3),
        },
      ]);
    }
  }
};
