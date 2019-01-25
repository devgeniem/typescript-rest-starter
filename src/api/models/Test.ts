import { Model } from 'objection';
import  { addSchema } from 'objection-ts-schema';

export class TodoModel extends Model {
  @addSchema id: number;
  @addSchema text: string;
}
