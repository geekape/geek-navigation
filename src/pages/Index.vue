<template>
	<div class="index container">
		<aside class="left-bar" id="leftBar" :style="{left: isLeftbar ? 0 : '-249px'}">
			<div class="title">
				<p>猿梦极客导航</p>
			</div>
			<nav class="nav">
				<div class="item active"><a href=""><i class="iconfont icon-daohang2"></i>极客导航</a><i class="line"></i></div>
				<ul class="nav-item" id="navItem">
					<li v-for="(item,index) in data" :key="index" @click="jumpId(i)"><a :href="'#' + item.classify" :class="{active: index == selfIndex}"><i
							 :class="item.icon" class="icon"></i>{{item.classify}}</a></li>
				</ul>
				<div class="item comment" @click="dialogFormVisible = true"><a><i class="iconfont icon-liuyan"></i>新增网站</a></div>


			</nav>
		</aside>


		<section class="main">
			<div id="mainContent">
				<!-- 手机端菜单 -->
				<div id="menu-box">
					<div id="menu">
						<input type="checkbox" id="menu-form">
						<label for="menu-form" class="menu-spin" @click="isLeftbar=!isLeftbar">
							<div class="line diagonal line-1"></div>
							<div class="line horizontal"></div>
							<div class="line diagonal line-2"></div>
						</label>
					</div>
				</div>
				<!-- 开发社区 -->
				<div class="box" v-for="(item,index) in data" :key="index">
					<a href="#" :name="item.classify"></a>
					<div class="sub-category">
						<div><i :class="item.icon" class="icon"></i>{{item.classify}}</div>
					</div>
					<div v-for="(sub,idx) in item.sites" :key="'sub-'+idx">
						<a target="_blank" :href="sub.href">
							<div class="item">
								<div class="logo"><img :src="sub.logo" :alt="sub.name">{{sub.name}}</div>
								<div class="desc">{{sub.desc}}</div>
							</div>
						</a>
					</div>
				</div>
			</div>

			<footer class="footer">
				<div class="copyright">
					<div>
						Copyright © 2018- 2050
						<a href="http://www.zcbboke.com">极客猿梦导航 钟储兵博客</a>
					</div>
				</div>
			</footer>
			<div id="fixedBar"><svg class="Zi Zi--BackToTop" title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24"
				 height="24">
					<path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path>
				</svg></div>
		</section>

		<el-dialog title="添加网站" :visible.sync="dialogFormVisible" width="30%">
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
				<el-form-item label="网站名称" prop="name">
					<el-input v-model="form.sites.name"></el-input>
				</el-form-item>
				<el-form-item label="网站分类" prop="classify">
					<el-select v-model="form.classify" placeholder="请选择网站分类">
						<el-option :label="classfiys.classify" :value="classfiys.classify" v-for="(classfiys, classfiyIdx) in data" :key="classfiys._id"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="网站链接" prop="href">
					<el-input v-model="form.sites.href"></el-input>
				</el-form-item>
				<el-form-item label="网站描述" prop="desc">
					<el-input type="textarea" v-model="form.sites.desc"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('form')">立即创建</el-button>
					<el-button @click="resetForm('form')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				selfIndex: 0,
				dialogTableVisible: false,
				dialogFormVisible: false,
				isLeftbar: true,
				form: {
					classify: "",
					icon: "el-icon-edit",
					sites: {
						name: "",
						href: "",
						desc: "",
						logo: ""
					}
				},
				rules: {
					classify: [{
						required: true,
						message: '请选择网站分类',
						trigger: 'change'
					}]
				}
			}
		},
		computed: {
			
		},

		methods: {
			jumpId(idx) {
				this.selfIndex = idx;
			},
			submitForm(formName) {
				var that = this
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.form.sites.logo = this.form.sites.href + '/favicon.ico'
						this.$http.post('/api/data', this.form).then(res => {
						})
						this.$message('保存成功');
						this.dialogFormVisible = false
						that.getData()
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			getData() {
				this.$http.get("/api/data").then(res => {
					this.data = res.data
				});
			}

		},
		created() {
			const that = this
			this.getData()
			window.onresize = () => {
					return (() => {
							window.screenWidth = document.body.clientWidth
							if(window.screenWidth<481) {
								that.isLeftbar = false
							}else {
								that.isLeftbar = true
							}
					})()
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
