/*
 * super class for controllers with admin authorization
 */
import LoggedController from './LoggedController';


export default abstract class AuthAdminController extends LoggedController {

  // check that user is logged in and admin
  async authorizationCheck () {
    return await this.session.loggedIn && this.session.user.admin;
  }

}
