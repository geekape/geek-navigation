# geek-navigation 2.0

猿梦极客导航，致力于方便程序员寻找各种网络资源。

## 版本更新
- v.1.0 版本主要是静态的导航页面
- v.x... 修复一些BUG，具体请看[commit](https://github.com/geekape/geek-navigation/commits/master)
- v.2.0 使用Vue+Express+MongoDB的动态导航站，支持用户提交网站，后台管理员审核通过才显示到前台。

## 进度
- [x] 将静态导航改为Vue
- [x] mock数据  
- [x] MongoDB对接，显示和增加网站
- [ ] 登录页面
- [ ] 管理员审核页面
- [ ] 修改为本地JSON存储版
- [ ] 重构前端样式，优化代码

## 使用
```js
// 1. 下载代码
git clone git@github.com:geekape/geek-navigation.git

// 2. 本地安装包
npm i 或者 cnpm i

// 3.假设已启动mongodb，启动本地服务器
node server/app.js

// 4. 运行项目
npm run serve

// 5. 预览项目
http://localhost:8080
```
> 




