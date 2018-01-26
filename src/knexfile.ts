// Update with your config settings.

const config = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'sb2_dev',
    },
    migrations: {
      directory: '../migrations',
      extensions: ['.ts'],
      stub: '../migrationStub.ts',
    },
    dbManager: {
      collate: ['fi_FI.UTF-8', 'utf8_swedish_ci'],
      superUser: 'root',
      superPassword: '',
    },
  },

  /**
   * @todo Assign a non-root user with a proper password before deploying!
   */
  staging: {
    client: 'mysql',
    connection: {
      host: 'mariadb',
      user: 'root',
      password: '',
      database: 'sb2_staging',
    },
    migrations: {
      directory: '../migrations',
      extensions: ['.ts'],
      stub: '../migrationStub.ts',
    },
    dbManager: {
      collate: ['fi_FI.UTF-8', 'utf8_swedish_ci'],
      superUser: 'root',
      superPassword: '',
    },
  },

  /**
   * @todo Assign a non-root user with a proper password before deploying!
   */
  production: {
    client: 'mysql',
    connection: {
      host: 'mariadb',
      user: 'root',
      password: '',
      database: 'sb2_prod',
    },
    migrations: {
      directory: '../migrations',
      extensions: ['.ts'],
      stub: '../migrationStub.ts',
    },
    dbManager: {
      collate: ['fi_FI.UTF-8', 'utf8_swedish_ci'],
      superUser: 'root',
      superPassword: '',
    },
  },
};
module.exports = config;
export default config;

