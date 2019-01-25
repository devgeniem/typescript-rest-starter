import { BaseController } from './classes';

export class TodoController extends BaseController {
  static routes = [ '/todo' ];

  async response() {
    return 'hello world';
  }
}
