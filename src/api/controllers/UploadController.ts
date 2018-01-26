import { BaseController } from './classes';

export default class UploadController extends BaseController {
  static routes = ['/upload'];
  response () {
    const { files } = this;
    return files ? files : {
      help: 'please try me with  curl -X POST  http://localhost:8080/upload  -F test=@test.jpeg',
    };
  }
}
