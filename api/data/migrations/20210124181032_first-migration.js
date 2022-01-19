exports.up = async (knex) => {
  await knex.schema.createTable("users_table", (table) => {
    table.increments("user_id");
    table.string("user_email", 100).notNullable();
    table.string("user_password", 200).notNullable();
    table.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users_table");
};
