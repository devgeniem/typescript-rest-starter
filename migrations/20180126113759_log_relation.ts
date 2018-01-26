import * as Knex from 'knex';


exports.up = async function (knex: Knex) {
  await knex.schema.table('log', (table) => {
    table.integer('uid').alter().unsigned().references('users.id');
  });
};

exports.down = async function (knex: Knex) {

};
