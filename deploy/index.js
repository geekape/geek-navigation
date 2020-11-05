const scpClient = require('scp2');
const ora = require('ora');
const chalk = require('chalk');

const server = {
  // 你的服务器ip
  host: 'xxx',
  // 服务器ssh端口
  port: 22,
  // 服务器用户名
  username: 'xxx',
  // 服务器密码
  password: 'xxx',
  // 项目上传的目录
  path: '/www/wwwroot/navigation.zcbing.cn/'
}

const spinner = ora('正在发布到生产服务器...');
spinner.start();
deployDist()

function deployDist() {

  scpClient.scp(
    'package.json',
    server,
    function(err) {
      if (!err) {
        console.log('发布package')
      }
    }
  )
  scpClient.scp(
    'nuxt.config.js',
    server,
    function(err) {
      if (!err) {
        console.log('发布nuxt.config.js')
      }
    }
  )

  scpClient.scp(
    'server/',
    {
      ...server,
      path: `${server.path}server/`
    },
    function(err) {
      if (!err) {
        console.log('发布server')
      }
    }
  )

  scpClient.scp(
    '.nuxt/',
    {
      ...server,
      path: `${server.path}.nuxt/`
    },
    function (err) {
      spinner.stop();
      if (err) {
        console.log(chalk.red('发布失败.\n'));
        throw err;
      } else {
        console.log(chalk.green('Success! 成功发布到服务器！'));
      }
    }
  );
}
