# 极客猿梦导航

> 独立开发者的导航站!

预览: [➡️ http://navigation.zcbing.cn/](http://navigation.zcbing.cn/)

## V1.0 版本

- [老版本纯静态导航版](https://github.com/geekape/geek-navigation/tree/master)：最初的一版静态页面，数据都写在页面里的。

- [JSON 静态导航版](https://github.com/geekape/geek-navigation/tree/json-navigation)：数据和页面分享，可以部署在`github`或`gitee`上使用，将 dist 目录下的文件上传到远程仓库里访问。

- [数据库动态导航版](https://github.com/geekape/geek-navigation/tree/vue2)：功能最全的版本，后续会增加更多功能

## v2.0

- vue 全家桶
- elementUI

⚠️ 用户提交网站，只需要填写网站 url 和分类，提交后爬虫会补信息，如 logo，标题和描述。

### TODO

- [ ] mongoose 联表优化
- [x] 首页加 keep-live
- [ ] 增加喜欢和浏览量
- [ ] 增加提交作者名，信息
- [ ] 增加搜索
- [ ] 分页等接口优化
- [ ] 审核列表状态切换
- [ ] 提交排除重复网站
- [ ] 自动化部署
- [ ] 常用分类
- [ ] 最近添加
- [ ] 优化 README 文档

- [x] 一键拒绝审核列表
- [x] 后台网站编辑更新
- [x] 爬虫爬取失败手动填写
- [x] 验证 url
- [x] websitelist
- [x] 审核网站爬虫自动补全信息
- [x] 用户登录，默认第一次登录账号为管理员

![登录](https://cdn.nlark.com/yuque/0/2020/jpeg/225518/1593593546788-5b5fbe71-579f-43f7-8991-1138e444034d.jpeg?x-oss-process=image%2Fresize%2Cw_1016)

![首页](https://cdn.nlark.com/yuque/0/2020/jpeg/225518/1593593547716-ad9b83f3-7586-4513-9552-09bf60454b91.jpeg?x-oss-process=image%2Fresize%2Cw_1016)

![审核页](https://cdn.nlark.com/yuque/0/2020/jpeg/225518/1593593548792-f011d40e-6c53-4960-a22b-333a7e1fb45f.jpeg?x-oss-process=image%2Fresize%2Cw_1016)

![分类页](https://cdn.nlark.com/yuque/0/2020/jpeg/225518/1593593549607-f86d5c36-6166-4645-ac30-39bfeecac4bf.jpeg?x-oss-process=image%2Fresize%2Cw_1016)

## 友情提示

> 一个好的产品，是需要不断打磨和完善的。

- 如果你对这个项目有兴趣，可点`star`保持关注。
- 有什么建议和问题都可提[issues](https://github.com/geekape/geek-navigation/issues)或者加 qq 群

## 常见问题

- [已解决的问题列表](https://github.com/geekape/geek-navigation/issues?q=is%3Aissue+is%3Aclosed)

### 1. 什么是数据库版？什么是静态 JSON 版本？

为了方便无需配置数据库的小白，提供了静态[JSON 版本的导航](https://github.com/geekape/geek-navigation/tree/json-navigation)，静态版本只能本地修改 JSON 添加导航，没有管理后台。

而相对于静态版的 ×× 数据库版本\*\*，它提供了管理导航的界面，用户可在线提交网站，后台审核，并管理所有网站（推荐）

### 2. 本地 mongodb 没导航数据？

运行爬虫文件`node reptile.js`,确保你已经开启了本地 Mongodb 数据库，就可以爬导航到本地的数据库了

### 3. 本地运行

```js
// 1. 下载代码
git clone git@github.com:geekape/geek-navigation.git

// 2. 本地安装包
npm i 或者 cnpm i

// 3.假设已启动mongodb，启动本地服务器
nodemon server/app.js

// 4. 运行项目
npm run serve

// 5. 预览项目
http://localhost:8080
```

## 前端交流学习

---

| 个人微信号(zcb861013016)                                                                                    | QQ 交流群(361979424)                                                                                        |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ![](https://cdn.nlark.com/yuque/0/2020/jpeg/225518/1593593545660-5385c319-49af-49a7-833e-25a3169721c6.jpeg) | ![](https://cdn.nlark.com/yuque/0/2020/jpeg/225518/1593593544745-f344575b-aaae-4d56-96bc-6c8d44df189a.jpeg) |
