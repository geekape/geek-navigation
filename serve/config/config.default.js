/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1578837610979_2778';

  // add your middleware config here
  // 加载 errorHandler 中间件
  config.middleware = [ 'errorHandler' ]

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/navigation',
      options: {}
    }
  }

  config.security = {
    csrf: {
      enable: false
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
