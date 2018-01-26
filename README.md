RESt api boilerplate with TypeScript
==========================================

Motivation of this repository is to give you a sane and simple starting point for your own
Rest API or generic what ever server.  

ResTs is intendted to ever be a full do it all framework or  npm module, it's just relatively short
pieces of quite generic Express-server code and controller classes that you can modify and grow to your needs.

Master branch of this repository is intented to be cloned as starting point for your own
project. So it contains only one simple route and tests for it, nothing more.

For examples see other branches in this repository.

- Typescript [TSC](http://www.typescriptlang.org/)
- CORS support [cors](https://github.com/troygoode/node-cors)
- Body Parsing [body-parser](https://github.com/expressjs/body-parser)
- Multipart file uploads [multer](https://github.com/expressjs/multer)
- Models [objection](http://vincit.github.io/objection.js/#models)
- sql utilities [knex](http://knexjs.org/)
- Secure application [helmet](https://helmetjs.github.io/)



Getting Started
---------------

## Requirements
- typescript 2.5.2 or newer 
- a running sql service such as mysql or pg
- redis server (see redis options in  /src/api/aserver.ts)

## Starting the environment

```sh
# Install typescript
npm install typescript -g

# Install dependencies
npm install

# run dev
npm run dev

```

## Optional: Starting a dockerized MariaDB

```sh
docker-compose -f docker-compose-dev.yml up

```

## Writing your first Controller
Controller class is all you need to write to get a working endpoint.

 Create file src/api/controllers/HelloController.ts

```

import { Controller } from './classes';

export default class HelloController extends Controller {
  static routes = ['/hello', '/hello/:name'];
  response () {
    const { name = 'anonymous' } = this.params;
    return `Hello ${name}`;
  }
}



```

 Edit file src/api/controllers/index.ts

```
// export your available controllers here
export { default as HelloController } from './HelloController';

```

That's it. Try 

 http://localhost:8080/hello   and  http://localhost/hello/johnny and http://localhost:8080/hello?name=Jane


## Writing async Controller

When you need to make asyncronous responses just change your
Controllers response method to async await format.

```

import { BaseController } from './classes';

export default class HelloController extends BaseController {
  static routes = ['/hello', '/hello/:name'];

  delayedHello (name) {
    return new Promise(
      (res, rej) => { setTimeout(() => { res(`See you later ${name}`); }, 1000); }
    );
  }

  async response () {
    const { name = 'alligator' } = this.params;
    return await this.delayedHello(name);
  }
}

```


Project structure
-----------------

```
myProjectRoot
│   README.md
└─── migrations
│   │   <timestamp>_migration_name.ts   
│
└─── src
│   │   checkServer.ts
│   │   config.json.ts
│   │   knexfile.ts
│   │   server.ts
│   │   
│   └─── api
│       │    api.ts
│       └─── controllers
│       │    └─── classes 
│       │         MyAbstractController.ts
│       │   MyController.ts
│       │   
│       └─── models
│           │   MyModel.ts
│
└─── test
│    └─── controllers
│        │   MyController.spec.js
└─── dist
```

## src/api/controllers
Write your own controller classes on top folder of src/api/controllers. 
Minimal application needs you only need to write controllers.

src/api/controllers/classes contains abstract controllers used for inheritance purposes only.

## src/api/models
Your objection models go here





READ UP
-------
- [migrating database](http://knexjs.org/#Migrations)
- [objection](http://vincit.github.io/objection.js/#introduction)

