/* 
* - knex, objection model binding
* - adds ./controllers to routes using static paths variable from each controlelr class
* - routes are sorted in alphabetical order, checks for dublicate routes
*/

import { Router } from 'express';
import { Model } from 'objection';

import * as Controllers from './controllers';

export default ({ config, knex }) => {
  const router = Router();
  // bind knex to model
  Model.knex(knex);
  // create list pointers to controllers that have routes
  const pathIndex = [];
  const controllerList = [];
  Object.keys(Controllers).forEach((name) => {
    const controller = Controllers[name];
    if (controller.routes) {
      controller.routes.forEach((route) => {
        let method = 'all';
        let path = route;
        const routeParts = route.split(' ');
        if (routeParts.length === 2) {
          method = routeParts[0].toLowerCase();
          path = routeParts[1];
        }
        if (pathIndex.indexOf(route) !== -1) {
          console.error('CONFLICTING ROUTE', route);
          process.exit();
        }
        pathIndex.push(route);
        const sortStr = path.split(':').join('|');
        controllerList.push(
          { name, route, method, path, sortStr, controller });
      });
    }
  });
  // create routes based on 
  controllerList
    .sort((a, b) => {
      // sort alphabetically, if same path "all" method last
      const order = a.sortStr < b.sortStr ? -1 : a.sortStr > b.sortStr ? 1 : 0;
      return order === 0 ? (a.method === 'all' ? 1 : 0) : order;
    })
    .forEach((item) => {
      const { name, route, method, path, controller } = item;
      console.log('Route:', method.toUpperCase(), path, '->', name);
      router[method](path, (req, res) => {
        new controller(req, res).handle();
      });
    });

  return router;
};
