exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').unique().notNullable();
    table.string('password').nullable()
    table.string('name').notNullable();
    table.string('profile_picture').nullable()
    table.string('google_user_id').nullable();
    table.datetime('createdAt').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users')
};
