import { BaseController, ControllerError } from './classes';

export class Version extends BaseController {
	static routes = [ '/', '/version' ];
	async response() {
		return { version: process.env.npm_package_version };
	}
}
