import { BaseController } from './classes';
import User from '../models/User';
import * as bcrypt from 'bcrypt';
import { ControllerError } from './classes/Controller';

export class RegisterController extends BaseController {
  static routes = ['/register', 'PUT /user'];

  async response () {
    const email: string = this.params.email;
    const password: string = this.params.password;
    const name: string = this.params.name;

    if (!email || !password) {
      throw new ControllerError('invalid parameters');
    }

    let hash;
    try {
      hash = await bcrypt.hash(password, 8);
    } catch (error) {
      throw new ControllerError('failed to crypt password');
    }

    try {
      // always try catch your model queries to properly handle errors
      return await User
        .query()
        .insert({ email, hash, name });
    } catch (error) {
      // could check error what really happened, but here just send generic error
      throw new ControllerError('failed to create new user account');
    }

  }

}
