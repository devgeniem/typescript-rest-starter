import { BaseController } from './classes';

export class TestValidation extends BaseController {
  static routes = [ '/validate' ];
  static paramSchema = {
    type: 'object',
    properties: {
      num: { type: 'number' },
      str: { type: 'string' }
    },
    required: [ 'num', 'str' ]
  };
  async response() {
    return this.params;
  }
}
