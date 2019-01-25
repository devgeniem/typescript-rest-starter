import { Request, Response } from 'express';

import * as Ajv from 'ajv';

/**
 * export instance with settings for ajv schema validator
 */
export const ajv = new Ajv({
	coerceTypes: true,
	allErrors: true,
	removeAdditional: 'all',
	validateSchema: false,
	ownProperties: true
});

/**
 * BaseController interface for custom base controller
 */
export interface Controller {
	handle(): Promise<any>;
	req: Request;
	res: Response;
}

/*
 * ControllerError for handled error types
 * this error is displayed on rest output level
 */ export class ControllerError extends Error {
	code: number;
	statusCode?: number;
	payload?: any;
	constructor(message, statusCode?, payload?) {
		super(message);
		this.payload = payload;
		this.statusCode = statusCode;
	}
}
