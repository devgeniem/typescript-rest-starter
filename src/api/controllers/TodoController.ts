import { BaseController, ControllerError } from './classes';
import { TodoModel } from '../models/TodoModel';

export class TodoController extends BaseController {
  static routes = [ 'GET /todo', 'POST /todo' ];


  async response() {
    const method = this.req.method;
    console.log(method);
    switch (method) {
      case 'GET': 
        return await this.handleGet();
      case 'POST': 
        return await this.handlePost();
    }
  }

  async handleGet() {
    try {
      const res = await TodoModel.query();
      return res;
    } catch (error) {
      throw new ControllerError('nothing found');
    }
    
  }
  async handlePost() {
    const payload = this.params;
    console.log('payload', payload);
    try {
      await TodoModel
      .query()
      .insert(payload);
      return 'ok';  
    } catch (error) {
      console.log(error);
      return 'not ok';
    }
    
  }
}
