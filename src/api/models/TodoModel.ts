import { Model } from 'objection';
import  { addSchema } from 'objection-ts-schema';

export class TodoModel extends Model {
  static tableName = 'todo';

  @addSchema id: number;
  @addSchema text: string;
}
