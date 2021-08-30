<p align="center">
    <img src="http://ww1.sinaimg.cn/large/005tC3DKgy1gtjtpv1yzjj30bo0460t9.jpg" alt="极客猿, 极客猿导航, 独立开发者导航, 导航资源站">
</p>

<p align="center">
  独立开发者的导航站　<br>
  <a href="http://nav.geekape.net/">Demo</a>  |  <a href="https://github.com/geekape/geek-navigation/commits/nuxt">更新日志</a> | <a href="https://support.qq.com/product/330737">提BUG</a>
</p>


## 极客猿导航截图

**前台**

![Untitled](http://ww1.sinaimg.cn/large/005tC3DKgy1gtjsid80sjj31hc0qbwrb.jpg)

![Untitled](http://ww1.sinaimg.cn/large/005tC3DKgy1gtjsid7fdcj31hc0qbdrt.jpg)

![Untitled](http://ww1.sinaimg.cn/large/005tC3DKgy1gtjsidcwbrj31hc0qbafc.jpg)

**后台**

![Untitled](http://ww1.sinaimg.cn/large/005tC3DKgy1gtjsideeg9j31hc0qbjuh.jpg)

![Untitled](http://ww1.sinaimg.cn/large/005tC3DKgy1gtjsidfionj31hc0qbald.jpg)

![Untitled](http://ww1.sinaimg.cn/large/005tC3DKgy1gtjsidhob3j31hc0qbh0e.jpg)

![Untitled](http://ww1.sinaimg.cn/large/005tC3DKgy1gtjsidpwzpj31hc0qb45u.jpg)

![Untitled](http://ww1.sinaimg.cn/large/005tC3DKgy1gtjsidmhthj31hc0qbwjh.jpg)



## 发展历程

### [纯静态导航](https://github.com/geekape/geek-navigation/tree/master)

起源于腾讯导航站，那时候刚接触前端，到底找网站模仿，这个导航站因此诞生了。

![Untitled](http://ww1.sinaimg.cn/large/005tC3DKgy1gtjsidug7yj31060lsgue.jpg)

### [JSON 版本导航](https://github.com/geekape/geek-navigation/tree/json-navigation)

上一个版本添加导航要修改 HTML，JSON 版本解决了管理导航修改代码问题，通过管理 JSON 文件的形式来管理所有的导航。

![Untitled](http://ww1.sinaimg.cn/large/005tC3DKgy1gtjsid57sdj30z10l510c.jpg)

### [Vue2 动态导航](https://github.com/geekape/geek-navigation/tree/vue2)

上面版本的管理导航还是太麻烦，从这个版本开始，改为用数据库来管理，前台采用的 Vue 全家桶，服务端使用的框架是 Express，数据库是 Mongodb。

![Untitled](http://ww1.sinaimg.cn/large/005tC3DKgy1gtjsid58opj310j0l4wld.jpg)

### [Nuxtjs导航](https://github.com/geekape/geek-navigation/tree/nuxt)

Vue 动态导航是采用的单页面方式，非常不利于 SEO 优化，所以改用了 Nuxt SSR 的方式，这也是这个版本最大的改动。

![Untitled](http://ww1.sinaimg.cn/large/005tC3DKgy1gtjsnurietj30yy0kiq67.jpg)

### [V3.0版本导航](https://github.com/geekape/geek-navigation/tree/dev)

这个版本开始将不再进行大的改动，将持续迭代下去。

V3.0版本，最大的改动就是把项目**拆分为三个子项目**

- Nuxt后台 -> Ant Design Pro后台
- Express -> Eggjs

优化了整体代码，提高了代码可读和可维护性。

## 产品设计相关图
![功能图](http://ww1.sinaimg.cn/large/005tC3DKgy1gtju0h4evrj30ud0nh7a3.jpg)
![功能结构图](http://ww1.sinaimg.cn/large/005tC3DKgy1gtju0h5wytj319s0ht42q.jpg)
![信息结构图](http://ww1.sinaimg.cn/large/005tC3DKgy1gtju0h2wd4j30m80ewab8.jpg)


## 赞助
![](http://cdn.geekape.net/wp-content/uploads/2021/06/weixin.jpg)

开源不易, 有了您的赞助, 我们会做的更好~

## 技术反馈和交流
![](http://cdn.geekape.net/wp-content/uploads/2021/08/1629186749-7e302e188081838.jpg)


## 项目部署

查看根目录下的 .gitlab-ci自动部署脚本，其它的部署方式后续再弄，大同小异。

## 贡献和支持

如果你想参与项目，那就尽管提PR吧，让我们共建一个 NO.1 的导航站吧。

> 如果觉得项目还不错, 就点个star吧~
