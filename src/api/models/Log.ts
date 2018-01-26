// tslint:disable:function-name
import { Model } from 'objection';
import { default as User } from './User';

export default class Log extends Model {
  readonly id: number;
  uid: number;
  user: User;
  agent: string;
  ip: string;
  path: string;
  time: Date;

  static tableName = 'log';

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'integer' },
      uid: { type: 'integer' },
      agent: { type: 'string', minLength: 1, maxLength: 255 },
      ip: { type: 'string', minLength: 1, maxLength: 255 },
      path: { type: 'string', minLength: 1, maxLength: 255 },
      time: { type: 'Date' },

    },
  };

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: `${User.tableName}.id`,
        to: `${Log.tableName}.uid`,
      },
    },
  };
}
