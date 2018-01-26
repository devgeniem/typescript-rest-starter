/*
 * Multiple controller classes can be in one file, just don't make any default
 */
import { AuthController, ControllerError } from './classes';
import User from '../models/User';
import * as bcrypt from 'bcrypt';

export class SessionStateController extends AuthController {
  static routes = ['/session'];
  state () {
    const { loggedIn, user } = this.session;
    return { loggedIn, user };
  }
  async response () {
    return this.state();
  }
}

export class LoginController extends SessionStateController {
  static routes = ['/login'];

  async authorizationCheck () {
    return true;
  }

  async response () {
    const email: string = this.params.email;
    const password: string = this.params.password;

    if (!email || !password) {
      throw new ControllerError('invalid parameters');
    }

    let user;
    try {
      user = await User
        .query()
        .select(['hash', 'id', 'name', 'admin'])
        .findOne({ email });
      if (!user) {
        throw new ControllerError('user not found');
      }
    } catch (error) {
      // catch if there was severe database error
      throw new ControllerError('user find failed');
    }

    this.session.loggedIn = await bcrypt.compare(password, user.hash);

    if (!this.session.loggedIn) {
      throw new ControllerError('unauthorized');
    } else {
      delete user.hash; // dont save password hash to session
      this.session.user = user;
    }
    return this.state();
  }
}

export class LogOutController extends SessionStateController {
  static routes = ['/logout'];
  async response () {
    if (this.state().loggedIn) {
      delete this.session.loggedIn; // flag down loggedIn
      delete this.session.user; // delete user from session
      return { ...this.state(), loggedOut: true };
    } else {
      throw new ControllerError('not logged in');
    }
  }
}
