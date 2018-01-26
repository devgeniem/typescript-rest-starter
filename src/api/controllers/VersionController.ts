import { BaseController, ControllerError } from './classes';

export default class VersionController extends BaseController {
  static routes = ['/', '/version'];
  async response () {
    return { version: process.env.npm_package_version };
  }
}
