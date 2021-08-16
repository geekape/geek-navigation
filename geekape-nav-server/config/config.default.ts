import {EggAppConfig, EggAppInfo, PowerPartial} from 'egg';
import mongoConfig from './mongodb';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    config.keys = 'yuanmeng';

    config.security = {
        csrf: {
            enable: false
        }
    }

    config.cluster = {
        listen: {
            port: 3002,
            hostname: 'localhost'
        }
    }

    config.mongoose = {
        client: {
            url: mongoConfig.mongoUrl,
            options: {},
        },
    };

    config.middleware = ['error', 'auth'];
    config.error = {
        postFormat: (_e, {stack, ...rest}) => (appInfo.env === 'prod' ? rest : {stack, ...rest}),
    };

    config.jwt = {
        secret: 'xiaobing_19960412_jwttoken',
    };

    config.routerAuth = [
        "/api/nav",
        "/api/nav/random",
        "/api/nav/find",
        "/api/nav/list",
        "/api/nav/reptile",
        "/api/nav/ranking",
        "/api/login",
        "/api/index",
        "/api/category/list",
        "/api/tag/list"
    ];

    return {
        ...config,
    };
};
