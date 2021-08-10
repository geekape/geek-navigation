import { Service } from 'egg';


export default class CategoryService extends Service {
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }
}
