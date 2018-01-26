import { AuthController, ControllerError } from './classes';
import User from '../models/User';
import * as path from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs';

const roundedCorners = new Buffer(
  '<svg><rect x="0" y="0" width="300" height="240" rx="50" ry="50"/></svg>',
);

export default class UserController extends AuthController {
  static routes = ['/user', '/users/', '/user/:id'];

  async post () {
    const { id } = this.params;
    const userObj = this.params;
    delete userObj.id;
    if (this.files && this.files[0]) {
      const file = this.files[0];
      const host = this.req.headers.host;
      const filename = 'profilepic_' + id + '.png';
      userObj.url = host + '/' + 'uploads/' + filename;
      const sharpResult = await sharp(file.path)
        .resize(320, 240)
        .overlayWith(roundedCorners, { cutout: true })
        .png()
        .toFile(path.join('uploads', filename));
      fs.unlink(file.path, undefined);
    }
    if (!id) {
      throw new Error('no id parameter');
    }
    const name = this.params.name;
    const user = await User
      .query()
      .updateAndFetchById(id, this.params);

    return user;
  }

  async response () {
    const { id } = this.params;
    if (!id) {
      throw new ControllerError('invalid parameters');
    }
    switch (this.req.method) {
      case 'PUT':
        throw new ControllerError('not supported operation');
      case 'POST':
        return await this.post();
      default:
        if (id)
          return await User
            .query()
            .findById(id);
        else
          return await User
            .query()
            .select('*');
    }
  }
}
