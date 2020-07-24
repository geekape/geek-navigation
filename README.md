<h1 style="text-align: center">极客猿梦导航</h1>
<p style="text-align: center">
  独立开发者的导航站　<br>
  <a href="http://navigation.zcbing.cn/">Demo</a>  |  <a href="https://github.com/geekape/geek-navigation/commits/nuxt">更新日志</a> | <a href="https://github.com/geekape/geek-navigation/issues/46">提需求/留言</a> | <a href="https://github.com/geekape/geek-navigation/issues/new">提BUG</a> | 
  <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=fDuB_YjUasI22QoHU_HlZozIz5LPpZ8z&jump_from=webapi">QQ交流群</a>
</p>


## 版本说明

- [老版本纯静态导航版](https://github.com/geekape/geek-navigation/tree/master)：最初的一版静态页面，数据都写在页面里的。

- [JSON 静态导航版](https://github.com/geekape/geek-navigation/tree/json-navigation)：数据和页面分享，可以部署在`github`或`gitee`上使用，将 dist 目录下的文件上传到远程仓库里访问。

- [数据库动态导航版](https://github.com/geekape/geek-navigation/tree/vue2)：功能最全的版本，后续会增加更多功能

- [nuxt ssr版](https://github.com/geekape/geek-navigation/tree/nuxt)：更好的seo，更快的加载速度

## 应用截图

![登录](https://cdn.nlark.com/yuque/0/2020/jpeg/225518/1593593546788-5b5fbe71-579f-43f7-8991-1138e444034d.jpeg?x-oss-process=image%2Fresize%2Cw_1016)

![首页](https://cdn.nlark.com/yuque/0/2020/jpeg/225518/1593593547716-ad9b83f3-7586-4513-9552-09bf60454b91.jpeg?x-oss-process=image%2Fresize%2Cw_1016)

![审核页](https://cdn.nlark.com/yuque/0/2020/jpeg/225518/1593593548792-f011d40e-6c53-4960-a22b-333a7e1fb45f.jpeg?x-oss-process=image%2Fresize%2Cw_1016)

![分类页](https://cdn.nlark.com/yuque/0/2020/jpeg/225518/1593593549607-f86d5c36-6166-4645-ac30-39bfeecac4bf.jpeg?x-oss-process=image%2Fresize%2Cw_1016)

## 安装部署

### nuxt版本

1. 找到`deploy/index.js`文件，填写下服务器信息，配置下自动部署
2. 找到`package.json`文件，scripts.start下配置下root变量
3. 找到`nuxt.config.js`文件，配置mongodb链接
4. 运行`npm deploy`自动构建并打包到服务器上
5. 配置下网站的nginx文件，替换掉server_name
```
map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen          80;             # the port nginx is listening on
    server_name     navigation.zcbing.cn;    # setup your domain here

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    location / {
        expires $expires;

        proxy_redirect                      off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3000; # set the address of the Node.js instance here
    }
}
```
6. 服务器项目根目录下`npm install`安装包
7. `npm i -g pm2`安装下node进程管理
8. `pm2 start npm --name "nav" -- run start`启动下服务器
9. 访问下你配置的域名就ok了。
