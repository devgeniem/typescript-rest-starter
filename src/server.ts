'use strict';

import * as http from 'http';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as session from 'express-session';
import * as multer from 'multer';
import * as helmet from 'helmet';
import * as Knex from 'knex';
import * as knexfile from './knexfile';
import api from './api/api';
import configJson from './config.json';
import * as Redis from 'connect-redis';

import * as path from 'path';

const environment = process.env.NODE_ENV || 'development';

const app = express();
const server = http.createServer(app);

// create knex connection
const knex = Knex(knexfile[environment]);

// add crossdomain headers
app.use(cors({ exposedHeaders: configJson.corsHeaders }));

// POST body parasing
app.use(bodyParser.json({ limit: configJson.bodyLimit }));

// multiparts
const dest = configJson.uploads || './uploads/';
app.use(multer({ dest }).any());

// compress all responses
app.use(compression());

// secure with helmet https://helmetjs.github.io/
app.use(helmet());

// redis settings here
const options: Redis.RedisStoreOptions = {
  host: 'localhost',
};

const redisStore = Redis(session);
// session for options see https://github.com/expressjs/session

app.use(session({
  store: new redisStore(options),
  secret: 'MyCookieSecret1234',  // change this
  cookie: {},
  resave: true,
  saveUninitialized: true,
}));

// add api to paths
app.use('/', api({ knex, config: configJson }));

app.use('/uploads', express.static('uploads'));

console.log('Running in :', environment);
server.listen(process.env.PORT || configJson.port, () => {
  console.log(`Started on port ${server.address().port} time : ${new Date()}`);
});

export { server };

export default app;
