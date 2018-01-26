import * as Knex from 'knex';

/**
 * create log table for user api history logging
 */


exports.up = async function (knex: Knex) {
  await knex
    .schema
    .createTableIfNotExists('log', (table) => {
      table.increments('id').primary();
      table.integer('uid');
      table.string('agent');
      table.string('ip');
      table.string('path');
      table.dateTime('time');
    });
};

exports.down = async function (knex: Knex) {
  await knex.schema.dropTableIfExists('log');
};
