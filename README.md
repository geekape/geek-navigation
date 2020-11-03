<h1 align="center">极客猿梦导航</h1>
<p align="center">
  独立开发者的导航站　<br>
  <a href="http://navigation.zcbing.cn/">Demo</a>  |  <a href="https://github.com/geekape/geek-navigation/commits/nuxt">更新日志</a> | <a href="https://github.com/geekape/geek-navigation/issues/new">提BUG</a> | 
  <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=fDuB_YjUasI22QoHU_HlZozIz5LPpZ8z&jump_from=webapi">QQ交流群</a>
</p>



## 版本说明

- [老版本纯静态导航版](https://github.com/geekape/geek-navigation/tree/master)：最初的一版静态页面，数据都写在页面里的。

- [JSON 静态导航版](https://github.com/geekape/geek-navigation/tree/json-navigation)：数据和页面分享，可以部署在`github`或`gitee`上使用，将 dist 目录下的文件上传到远程仓库里访问。

- [数据库动态导航版](https://github.com/geekape/geek-navigation/tree/vue2)：vue2版本

- [nuxt ssr版](https://github.com/geekape/geek-navigation/tree/nuxt)：vue nuxt版本，更好的seo，更快的首屏加载速度

## 应用截图

![首页](https://cdn.nlark.com/yuque/0/2020/png/225518/1604404219179-bd630676-0434-47d7-88fb-c2d30f6a52f3.png?x-oss-process=image%2Fresize%2Cw_1401)


## 安装部署

### nuxt版本

1. 找到`deploy/index.js`文件，填写下服务器信息，配置下自动部署
![](https://cdn.nlark.com/yuque/0/2020/png/225518/1604404420095-d4641663-9a88-4dc8-9c3b-7cd4ad2376a3.png?x-oss-process=image%2Fresize%2Cw_1016)

2. 找到`package.json`文件，配置下 `root`
![](https://cdn.nlark.com/yuque/0/2020/png/225518/1604404507333-eaef76d4-2768-467e-b297-fe69f6a1780c.png?x-oss-process=image%2Fresize%2Cw_1016)

3. 找到`nuxt.config.js`文件，配置mongodb链接
![](https://cdn.nlark.com/yuque/0/2020/png/225518/1604404593230-b3c18df0-3ff7-4fdd-9eac-de7c1e27b90b.png?x-oss-process=image%2Fresize%2Cw_1016)

4. 运行`npm deploy`自动构建并打包到服务器上
![](https://cdn.nlark.com/yuque/0/2020/png/225518/1604404738719-a521df02-230b-47e2-921b-db8017314adc.png)

5. 配置下网站的nginx文件，替换掉server_name
![](https://cdn.nlark.com/yuque/0/2020/png/225518/1604405307396-86b34fdd-1e7f-4803-b456-7b2d9a5e2c70.png)
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
![](https://cdn.nlark.com/yuque/0/2020/png/225518/1604405088379-f35f0f47-197e-46ae-825e-614568a34159.png)

7. `npm i -g pm2`安装下node进程管理
![](https://cdn.nlark.com/yuque/0/2020/png/225518/1604405164042-91d9384a-b75a-4a3e-8562-015538530c14.png)

8. `pm2 start npm --name "nav" -- run start`启动下服务器
![](https://cdn.nlark.com/yuque/0/2020/png/225518/1604405227675-546282af-8eab-4a01-8481-0735cd62540d.png)

9. 访问下你配置的域名就ok了。
