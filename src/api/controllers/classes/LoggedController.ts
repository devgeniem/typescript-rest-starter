/*
 * super class for controllers with logging
 */

import Log from '../../models/Log';
import BaseController from './BaseController';

export default abstract class LoggedController extends BaseController {

  // log user path, after Response hook happens after request is returned to client
  async afterResponse () {
    if (this.session.user) {
      return await Log.query().insert({
        uid: this.session.user.id,
        agent: this.req.headers['user-agent'].toString(),
        ip: this.req.ip,
        path: this.req.path,
        time: new Date(),
      });
    }
  }
}
