
import { Request, Response } from 'express';

/**
 * BaseController interface for custom base controller
 */
export interface Controller {
  handle (): Promise<any>;
  req: Request;
  res: Response;
}

/*
 * ControllerError for handled error types
 * this error is displayed on rest output level
 */
export class ControllerError extends Error {
  code: number;
  statusCode?: number;
  constructor(message, statusCode?) {
    super(message);
    this.statusCode = statusCode;
  }
}


