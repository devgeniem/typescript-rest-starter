// tslint:disable:function-name
import { Model } from 'objection';

export default class User extends Model {
  readonly id: number;
  email: string;
  name: string;
  hash: string;
  static tableName = 'users';

  $formatJson (json) {
    const formatted: any = super.$formatJson(json);
    // password hash has been removed so it doesnt show up in any results
    delete formatted.hash;
    return formatted;
  }

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      email: { type: 'string', minLength: 1, maxLength: 255 },
      hash: { type: 'string', minLength: 1, maxLength: 255 },
    },
  };
}
