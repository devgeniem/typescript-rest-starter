import { Model } from 'objection';
import { addSchema } from 'objection-ts-schema';

export class TodoModel extends Model {
  static tableName = 'todo';

  @addSchema() id: number;
  @addSchema(true) text: string;

  $beforeValidate(schema, json, opt) {
    console.log('schema', schema)
    return super.$beforeValidate(schema, json, opt)
  }
}
