import * as Knex from 'knex';


exports.up = async function (knex: Knex) {
  await knex.schema.table('users', (table) => {
    table.string('hash').notNullable();
  });
};

exports.down = async function (knex: Knex) {

};
