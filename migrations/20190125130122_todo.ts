
const TABLE = 'todo';

exports.up = async function (knex) {
  await knex.schema.createTable(TABLE, (table) => {
    table.increments('id').primary();
    table.text('text').nullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable(TABLE);
};
