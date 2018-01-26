/*
 * Base Class for Controllers
*/

import * as R from 'ramda';
import { Router, Request, Response } from 'express';
import { Controller, ControllerError } from './Controller';

export default abstract class BaseController implements Controller {
  req: Request;
  res: Response;
  params: any;
  session: any;
  files: any;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  getSession () {
    this.session = this.req.session;
  }
  // hook for authorization check, return false if not authorized
  authorizationCheck () {
    return true;
  }
  // parameter collection hook
  async reqParams () {
    this.params = R.merge(this.req.params, this.req.query);
    if (this.req.body) {
      this.params = R.merge(this.params, this.req.body);
      delete this.req.body;
    }
    if (this.req.files) this.files = this.req.files;
    return this;
  }
  // response hook
  abstract response (): void;

  async handle () {
    await this.getSession();
    await this.reqParams();
    if (!await this.authorizationCheck()) {
      return this.res.status(401).json({ error: { message: 'unauthorized', code: 401 } });
    }
    try {
      const result = await this.response();
      return this.res.status(200).json(result);
    } catch (error) {
      if (error instanceof ControllerError) {
        return this.res.status(error.statusCode || 500)
          .json({ error: { message: error.message, code: error.code } });
      } else {
        // catch only error types that are handled, let others fall thru
        throw error;
      }
    }
  }
}
