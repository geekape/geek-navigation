
<template>
	<div class="index container">
		<aside class="left-bar" id="leftBar" :style="{left: isLeftbar ? 0 : '-249px'}">
			<div class="title">
				<p>猿梦极客导航</p>
			</div>
			<nav class="nav">
				<div class="item active">
					<a href="">
						<i class="iconfont icon-daohang2"></i>极客导航
					</a>
					<i class="line"></i>
				</div>
				<ul class="nav-item" id="navItem">
					<li v-for="(item,index) in data" :key="index" @click="jump(index)">
						<a :class="{active: index == selfIndex}">
							<i :class="item.icon"></i>
							{{item.classify}}
						</a>
					</li>
				</ul>
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
						<div>
							<i :class="item.icon" class="icon"></i>
							{{item.classify}}
						</div>
					</div>
					<NavItem :data="sub"  v-for="(sub,idx) in item.sites" :key="'sub-'+idx" />
				</div>
			</div>
			<footer class="footer">
				<div class="copyright">
					<div>
						Copyright © 2018- 2050
						<a href="http://geekape.github.io">极客猿梦导航 钟储兵博客</a>
					</div>
				</div>
			</footer>
			<back-top/>
		</section><add-nav-btn :data="data" />
	</div>
</template>

<script>
import BackTop from "@/components/BackTop";
import AddNavBtn from "@/components/AddNavBtn";
import NavItem from "@/components/NavItem";
export default {
  data() {
    return {
      data: [],
      scroll: 0,
      selfIndex: 0,
      isLeftbar: true
    };
  },
  components: {
    BackTop,
		AddNavBtn,
		NavItem
  },
  computed: {},
  methods: {
    jump(idx) {
      this.selfIndex = idx;

      // 跳转
      let allSite = document.querySelectorAll(".box");
      let selfOffsetTop = allSite[idx].offsetTop - 10;
      // 判断是否是在手机上
      window.screenWidth = document.body.clientWidth;
      if (window.screenWidth < 481) {
        selfOffsetTop -= 50;
      }
      // Chrome
      document.body.scrollTop = selfOffsetTop;
      // Firefox
      document.documentElement.scrollTop = selfOffsetTop;
      // Safari
      window.pageYOffset = selfOffsetTop;
    },

    async getData() {
      const res = await this.$api.getHome();
      this.data = res.data;
    },
    dataScroll() {
      const that = this;
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let allSite = document.querySelectorAll(".box");
      for (let i = 0; i < allSite.length; i++) {
        if (scrollTop >= allSite[i].offsetTop) {
          that.selfIndex = i;
        }
      }
    }
  },

  created() {
    const that = this;
    this.getData();
    // window.addEventListener('scroll', this.dataScroll);
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        if (window.screenWidth < 481) {
          that.isLeftbar = false;
        } else {
          that.isLeftbar = true;
        }
      })();
    };
    window.onresize();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-dialog {
  min-width: 320px;
}


</style>
