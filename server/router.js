const express = require("express");
const router = express.Router();

//引入数据模型模块
const navData = require("./model/navSchema");
const auditModel = require("./model/auditSchema");

// 设置登录验证
const jwt = require('jsonwebtoken');
const app = express()
const secret = '123123'; //密钥
app.set('superSecret', secret);


/**
 * 请求导航首页
 */
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
 * 提交一个导航到审核表
 */
router.post("/audit/add", (req) => {
	auditModel.create(req.body, function () { })
})


/**
 * 删除审核表中的导航
 */
router.post("/audit/del", (req) => {
	auditModel.remove({ _id: req.body.id }, () => { })
})


/**
 * 审核表
 */
router.get("/audit/list", (req, res) => {
	const token = req.headers.token
	jwt.verify(token, app.get('superSecret'), function (err, decoded) {
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
 * 添加审核表中的导航到导航表
 */
router.post("/nav/add", (req, res) => {
	auditModel.remove({ _id: req.body.id }, (err, result) => { })
	navData.update({ classify: req.body.classify }, { $push: { sites: req.body.sites } }, function (res, err) {
		if (err.n === 0) navData.create(req.body, function () { })
	})
})


/**
 * 删除导航表中的导航
 */
router.post("/nav/del", (req, res) => {
	navData.update({ _id: req.body.id }, { $pull: { sites: { name: req.body.name } } }, () => {})
})


/**
 * 编辑导航表中的导航
 */
router.post("/nav/edit", (req, res) => {
	const { id, sites: {
		href
	} } = req.body
	navData.update({ _id: id }, { $pull: { sites: { href: href } } }, (success, err) => {
		if (err) console.log(`错误了`, err)
	})

	navData.update({ classify: req.body.classify }, { $push: { sites: req.body.sites } }, () => {
		res.json({
			status: 200,
			msg: 'ok',
		})
	})
})


/**
 * 查找某个id的导航
 */
router.post("/nav/find", (req, res) => {
	const { id } = req.body
	console.log(req)
	navData.find({_id: id})
		.then(datas => {
			res.json(datas);
		})
		.catch(err => {
			res.json(err);
		});
})


/**
 * 登录
 */
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