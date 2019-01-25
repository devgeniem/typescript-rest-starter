/*
 * Base Class for Controllers
*/

import { merge } from 'ramda';
import { Router, Request, Response } from 'express';
import { Controller, ControllerError, ajv } from './Controller';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default abstract class BaseController implements Controller {
  req: Request;
  res: Response;
  params: any;
  static paramSchema: any;
  session: any;
  files: any;
  validator: any; // ajv schema

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.initValidator();
  }

  get method(): HttpMethod {
    return this.req.method as HttpMethod;
  }

  initValidator() {
    const schema = this.constructor['paramSchema'];
    if (schema) {
      this.validator = ajv.compile(schema);
    }
  }

  getSession() {
    this.session = this.req.session;
  }
  // hook for authorization check, return false if not authorized
  authorizationCheck() {
    return true;
  }
  // parameter collection hook
  async reqParams() {
    this.params = merge(this.req.params, this.req.query);
    if (this.req.body) {
      this.params = merge(this.params, this.req.body);
      delete this.req.body;
    }
    if (this.req.files) this.files = this.req.files;
    return this;
  }
  // validation hook
  async validateParams() {
    // if has schema for req params run validator
    if (this.validator) {
      try {
        const valid = this.validator(this.params);
        if (!valid) {
          throw new ControllerError('invalid parameters', 400, { invalidParameters: Object.keys(this.validator.errors).map((k) => this.validator.errors[k]) });
        }
        return valid;
      } catch (error) {
        if (error instanceof ControllerError) {
          throw error;
        }
        throw new ControllerError(error.message, 500);
      }
    }
    return true;
  }
  // response hook
  abstract response(): void;

  async handle() {
    try {
      await this.getSession();
      await this.reqParams();
      await this.validateParams();
      if (!await this.authorizationCheck()) {
        return this.res.status(401).json({ error: { message: 'unauthorized', code: 401 } });
      }
      const result = await this.response();
      return this.res.status(200).json(result);
    } catch (error) {
      if (error instanceof ControllerError) {
        return this.res.status(error.statusCode || 500).json({ error: { message: error.message, code: error.statusCode, ...error.payload } });
      } else {
        return this.res.status(error.code || 500).json({ error });
      }
    }
  }
}
