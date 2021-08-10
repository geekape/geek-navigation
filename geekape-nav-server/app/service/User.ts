import { Service } from 'egg';


export default class UserService extends Service {
  async login() {
    const { ctx, app } = this;
    const users = await ctx.model.User.findOne();
    if (!users) {
      // 没有管理员，默认设置一个
      await ctx.model.User.create(ctx.request.body);
    } else {
      const { username, password } = ctx.request.body;

      if (username !== users.username || password !== users.password) {
        throw new Error('账号或密码错误');
      }
    }
    const { username } = ctx.request.body;
    const token = await app.jwt.sign({
      username,
    }, app.config.jwt.secret);
    return 'Bearer ' + token;
  }
}
