/*
 * super class for controllers with authorization
 */

import LoggedController from './LoggedController';

export default abstract class AuthController extends LoggedController {

  // override authorization check with your own
  async authorizationCheck () {
    return await this.session.loggedIn;
  }

}
