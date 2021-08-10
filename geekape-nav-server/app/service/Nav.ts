import { Service } from 'egg';


export default class NavService extends Service {
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }
}
