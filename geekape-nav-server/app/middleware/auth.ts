module.exports = (_options, app) => {
  return async function(ctx, next) {
    // 拿到不需要验证的token的路由
    const routerAuth = app.config.routerAuth;
    // 获取当前路由
    let url = ctx.url;
    if (url.includes('?')) {
        url = url.split('?')[0]
    }
    // 判断当前路由是否需要验证token
    const flag = routerAuth.includes(url);
    if (flag) {
      await next();
    } else {
      // 获取token,如果没有传入token，则为空
      let token = ctx.headers.authorization ? ctx.headers.authorization : '';
      // 把Bearer 截取掉，解析的时候不需要加上Bearer
      token = token.substring(7);
      // 解析token
      try {
        const decode = await app.jwt.verify(token, app.config.jwt.secret);
        ctx.state.userinfo = decode;
        await next();
      } catch (err) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          msg: 'token失效或解析错误',
          data: null,
        };
      }
    }
  };
};
