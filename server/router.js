//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const navData = require("./model/navSchema");

// 查询所有导航网站数据
router.get("/data", (req, res) => {
    navData.find({})
        .then(datas => {
            res.json(datas);
        })
        .catch(err => {
            res.json(err);
        });
});



// 添加一个英雄信息路由
router.post("/data", (req, res) => {
    //使用Hero model上的create方法储存数据
    navData.update({ classify: req.body.classify }, { $push: { sites: req.body.sites } }, function(res, err) {
        if (err.n === 0) {

            // 创建一个新数据
            navData.create(req.body, function() {})
        }
    })
})


module.exports = router;