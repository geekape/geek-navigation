//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const navData = require("./model/navSchema");
const auditModel = require("./model/auditSchema");
const account = require("./model/account");
const jwt = require('jsonwebtoken');
const app = express()
const secret = '123123'; //密钥
app.set('superSecret', secret);

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

/**
 * 审核表
 */

// 提交一个导航
router.post("/audit/add", (req) => {
	// 创建一个新数据
	auditModel.create(req.body, function () { })
})
// 删除、拒绝一个导航
router.post("/audit/del", (req) => {
	//使用Student model上的create方法储存数据
	auditModel.remove({ _id: req.body.id }, (err, result) => { })
})

// 请求审核列表
router.get("/audit/list", (req, res) => {
	const token = req.headers.token
	console.log('token:',token)
	jwt.verify(token, app.get('superSecret'), function (err, decoded) {
		console.log(decoded, err)
		//decoded　是得到的用户信息
		if (decoded.admin != secret) {
			return res.status(401).send({
				status: 401,
				msg: 'No token provided.'
			});
		} else {
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
		}
	})
});

/**
 * 导航表
 */

// 审核通过一个导航
router.post("/nav/add", (req, res) => {
	auditModel.remove({ _id: req.body.id }, (err, result) => { })
	navData.update({ classify: req.body.classify }, { $push: { sites: req.body.sites } }, function (res, err) {
		if (err.n === 0) {
			// 创建一个新数据
			navData.create(req.body, function () { })
		}
	})
})

// 删除一个导航
router.post("/nav/del", (req, res) => {
	navData.update({ _id: req.body.id }, { $pull: { sites: { name: req.body.name } } }, function (res, err) {
		console.log(res, err)
	})
})

// 编辑导航
router.post("/nav/edit", (req, res) => {
	navData.update({ _id: req.body.id }, { $pull: { sites: { href: req.body.sites.href } } })

	navData.update({ classify: req.body.classify }, { $push: { sites: req.body.sites } }, function () {
		res.json({
			status: 200,
			msg: 'ok',
		})
	})
})


/**
 * 登录路由
 */

// 登录
router.post("/login", (req, res) => {
	const { account, pwd } = req.body

	// 判断账号密码
	if (account != 'admin' || pwd != secret) {
		res.json({
			status: 400,
			msg: '账号或密码错误',
		});
	} else {
		const token = jwt.sign({ 'admin': secret }, app.get('superSecret'))
		res.json({
			status: 200,
			msg: 'ok',
			token: token
		});
	}
});

module.exports = router;