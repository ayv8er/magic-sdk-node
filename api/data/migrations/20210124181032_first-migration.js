exports.up = async (knex) => {
  await knex.schema.createTable("users_table", (table) => {
    table.string("user_issuer", 200).notNullable();
    table.string("user_credential", 100).notNullable();
    table.string("user_public_address", 200).notNullable();
    table.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users_table");
};
