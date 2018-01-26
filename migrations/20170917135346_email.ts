import * as Knex from 'knex';


exports.up = async function (knex: Knex) {
  await knex.schema.table('users', (table) => {
    table.string('email').notNullable();
  });
};

exports.down = async function (knex: Knex) {

};
