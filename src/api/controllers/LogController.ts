import { AuthAdminController, ControllerError } from './classes';
import Log from '../models/Log';

export default class LogController extends AuthAdminController {
  static routes = ['/logs', '/log', '/logs/:uid', '/log/:uid'];
  async response () {
    const { uid } = this.params;

    const logQ = Log.query()
      .select('*')
      .eager('user');  // populate user field using Log model relation

    if (uid) {
      logQ.where('uid', uid);  // find user if uid was given
    }

    try {
      return { params: this.params, logs: await logQ };
    } catch (err) {
      throw new ControllerError('failed to get logs');
    }

  }
}
