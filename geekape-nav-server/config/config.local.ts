import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.mongoose = {
    client: {
      url: 'mongodb://yuanmeng:yuanmeng521@176.122.147.140:27017/navigation',
      options: {},
    },
  };

  return config;
};
