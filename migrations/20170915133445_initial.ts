import * as Knex from 'knex';


exports.up = async function (knex: Knex) {
  await knex
    .schema
    .createTableIfNotExists('users', (table) => {
      table.increments('id').primary();
      table.string('name');
    });
  
};

exports.down = async function (knex: Knex) {
  await knex.schema.dropTableIfExists('users');
};
