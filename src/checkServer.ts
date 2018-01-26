import * as Knex from 'knex';
import * as knexfile from './knexfile';
import * as dbManager from 'knex-db-manager/lib';

const environment = process.env.NODE_ENV || 'development';

// create knex connection
const knex = Knex(knexfile[environment]);

// Check for database connection
knex
  .raw('select 1+1 as result')
  .then(() => {
    console.log('Database connection ok \n');
    process.exit();
  })
  .catch(() => {
    console.log('Database not found, creating it... \n');

    const dbManagerConfig = {
      knex: knexfile[environment],
      dbManager: knexfile[environment].dbManager
    };

    const dbm = dbManager.databaseManagerFactory(dbManagerConfig);
    dbm.createDbOwnerIfNotExist()
      .then(() => {
        return dbm.createDb();
      })
      .then(() => {
        dbm.close();
        const databaseName = knexfile[environment].connection.database;
        console.log(`Created database ${databaseName}`);
        process.exit();
      })
      .catch((error) => {
        console.log('Database creation failed', error);
        process.exit(1);
      });
  });
