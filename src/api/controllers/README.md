# Your application controllers go here

see examples and getting started


## Format

```
//super class of your controller
import { Controller } from './classes';

export default class ExampleController  extends Controller {
  //paths in express format, path variables and post body are automatically mapped to this.params;
  static paths = ['/example','/example/:myPathVariable];   
  async response () {
    const { myPathVariable } = this.params;
    return { example: 'result ' + myPathVariable };
  }
}

```