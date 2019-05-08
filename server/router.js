//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const navData = require("./model/navSchema");
const auditModel = require("./model/auditSchema");
const account = require("./model/account");

// 导航站首页
router.get("/index", (req, res) => {
    navData.find({})
        .then(datas => {
            res.json(datas);
        })
        .catch(err => {
            res.json(err);
        });
});

// 提交一个导航
router.post("/audit/add", (req, res) => {
    // 创建一个新数据
    auditModel.create(req.body, function () { })
})

// 删除、拒绝一个导航
router.post("/audit/del", (req, res) => {
    //使用Student model上的create方法储存数据
    auditModel.remove({ _id: req.body.id }, (err, result) => {
        console.log(result)
    })
})

// 审核通过一个导航
router.post("/nav/add", (req, res) => {
   

    navData.update({ classify: req.body.classify }, { $push: { sites: req.body.sites } }, function (res, err) {
        if (err.n === 0) {
            // 创建一个新数据
            navData.create(req.body, function () { })
        }
    })
})

// 请求审核列表
router.get("/audit/list", (req, res) => {
    auditModel.find({})
        .then(datas => {
            let data = {}
            data.data = datas
            data.status = 200
            data.msg = 'ok'
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;