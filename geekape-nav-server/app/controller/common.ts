import { Controller } from 'egg';

export default class CommonController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 1,
      msg: 'ok',
      data,
    };
  }
  error(msg) {
    this.ctx.body = {
      code: 0,
      msg,
      data: null,
    };
  }
}
