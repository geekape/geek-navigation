import Controller from './common'

export default class UserController extends Controller {
  public async login() {
    const { ctx } = this;
    try {
      const res = await ctx.service.user.login();
      this.success(res);
    } catch (e) {
      this.error(e.message);
    }
  }
}
