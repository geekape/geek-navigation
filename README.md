# geek-navigation 2.0

猿梦极客导航，致力于方便程序员寻找各种网络资源。

## JSON本地静态版

```js
// 1. 下载源码
git clone https://github.com/geekape/geek-navigation/tree/json-navigation

// 2.安装依赖,进入根目录
npm install 或 cnpm install

// 3. 运行
npm run serve

// 4. 查看效果
打开localhost:8080
```

## 常见问题
1. 添加导航
所有导航数据在根目录下`public/nav.json`里，在某个分类下新增sites数据就可以了，看结构就知道的。（静态版还是比较麻烦，你可以尝试Mongodb数据存储版，可在线提交网站，后台管理所有网站，添加删除操作都方便,[点我跳转](https://github.com/geekape/geek-navigation/tree/vue2)）

2.项目部署
将`dist`目录下的所有文件上传到网站根目录即可




