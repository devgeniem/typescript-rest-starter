import { BaseController, ControllerError } from './classes';
import { TodoModel } from '../models/TodoModel';

export class GetTodo extends BaseController {
  static routes = [ 'GET /todo' ];
  async response() {
    try {
      const res = await TodoModel.query();
      return res;
    } catch (error) {
      throw new ControllerError('nothing found');
    }
  }
}
export class TodoController extends BaseController {
  static routes = [ 'POST /todo' ];
  static paramSchema = { ...TodoModel.jsonSchema, required: [ 'text' ] };
  async response() {
    const payload = this.params;
    let result;
    try {
      result = await TodoModel.query().insert(payload);
    } catch (err) {
      console.error(err);
      result = err;
    }
    return {
      payload,
      paramSchema: this.constructor['paramSchema'],
      modelSchema: TodoModel.jsonSchema,
      result
    };
  }
}
