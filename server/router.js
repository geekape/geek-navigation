//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Data = require("./model/navSchema");

// 查询所有导航网站数据
router.get("/data", (req, res) => {
    Data.find({})
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
    Data.update({
        sortName: req.body.sortName
    }, {
        $push: {
            subData: req.body.subData
        }
    }, (err, doc) => {
        console.log(`doc${doc}`)
        if (doc.n == 0) {
            console.log('没有这个分类')
                // 不在的网站分类新建
            Data.create(req.body, (err, nav) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(nav);
                }
            })
        }
    })
})



module.exports = router;