const express = require("express");
const router = express.Router();
//引入数据模型模块
const app = express()
const jwt = require('jsonwebtoken')
const navData = require("./model/navSchema");
const auditModel = require("./model/auditSchema");
const userModel = require("./model/userSchema");
const jwtAuth = require("./jwt")
const { secretKey } = require('./config')

router.use(jwtAuth)

router.use((req, res, next) => {
  // 任何路由信息都会执行这里面的语句
  // 把它交给下一个中间件，注意中间件的注册顺序是按序执行
  next()
})



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
	navData.update({ _id: req.body.id }, { $pull: { sites: { name: req.body.name } } }, () => { })
})


/**
 * 编辑导航表中的导航
 */
router.post("/nav/edit", (req, res) => {
	const { id, sites: {
		href
	} } = req.body
	navData.update({ _id: id }, { $pull: { sites: { href: href } } }, (success, err) => {
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
	navData.find({ _id: id })
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
router.post("/login", async (req, res) => {
	const { account, pwd } = req.body

	// const users = await userModel.find()

	// const {username, password} = users[0]

	// 判断账号密码
	if (account != 'admin' || pwd != 'admin') {
		res.json({
			status: 400,
			msg: '账号或密码错误',
		})
	}

	let token = 'Bearer ' + jwt.sign({}, secretKey, {
		expiresIn: 60 * 60 * 24 // 授权时效24小时
	})

	res.json({
		status: 200,
		msg: 'ok',
		token
	})
})

// 处理 404
router.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 处理500
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      code: 401,
      message: 'invalid token',
      data: err
    });
  } else {
    res.status(err.status || 500).json({
      code: err.status || 500,
      message: err.message,
      data: err
    });
  }
});


module.exports = router;