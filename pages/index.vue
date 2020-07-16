<template>
  <section class="index container">
    <div class="left-bar" :style="{ left: isLeftbar ? 0 : '-249px' }">
      <div class="title">
        <img class="icon-logo" src="/favicon.ico" />
        <span>极客猿梦导航</span>
      </div>
      <el-row>
        <el-col :span="24">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#30333c"
            text-color="#6b7386"
            active-text-color="#fff"
            :default-openeds="defaultOpeneds"
            default-active="0-0"
          >
            <el-submenu
              :index="`${index}`"
              v-for="(item, index) in categorys"
              :key="item._id"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </template>
              <el-menu-item
                :index="`${index}-${idx}`"
                v-for="(nav, idx) in item.children"
                :key="nav._id"
                @click="findNav(nav._id)"
              >
                <a href="#">
                  <i :class="nav.icon"></i>
                  <span slot="title">{{ nav.name }}</span>
                </a>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <section class="main">
      <Header @handleMoreClick="isDrawer = true" />
      <div id="mainContent">
        <!-- 手机端菜单 -->
        <div id="menu-box">
          <div id="menu">
            <input type="checkbox" id="menu-form" />
            <label
              for="menu-form"
              class="menu-spin"
              @click="isLeftbar = !isLeftbar"
            >
              <div class="line diagonal line-1"></div>
              <div class="line horizontal"></div>
              <div class="line diagonal line-2"></div>
            </label>
          </div>
        </div>
        <!-- 开发社区 -->
        <WebsiteList v-loading="loading" :list="data" />
      </div>
      <footer class="footer">
        <div class="copyright">
          <div>
            Copyright © 2019- 2050
            <a href="https://github.com/geekape/geek-navigation">
              导航源码下载
            </a>
          </div>
        </div>
      </footer>

      <back-top />
    </section>
    <div class="add-nav-btn" @click="dialogFormVisible = true">
      <el-tooltip
        class="item"
        effect="dark"
        content="添加网站"
        placement="left-start"
      >
        <el-button>
          <i class="el-icon-plus"></i>
        </el-button>
      </el-tooltip>
    </div>

    <AddNavPopup :show.sync="dialogFormVisible" />

    <el-drawer :visible.sync="isDrawer" direction="rtl">
      <el-tabs>
        <el-tab-pane label="我的分类" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="最近添加" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </el-drawer>
  </section>
</template>

<script>
import BackTop from "~/components/BackTop";
import AddNavPopup from "~/components/AddNavPopup";
import Header from "~/components/Header";
import WebsiteList from "~/components/WebsiteList";
export default {
  components: {
    BackTop,
    AddNavPopup,
    Header,
    WebsiteList
  },
  data() {
    return {
      loading: false,
      isDrawer: false,
      active: "［前端］热门推荐",
      data: [],
      categorys: [],
      defaultOpeneds: ["0"],
      selfIndex: 0,
      isLeftbar: true,
      dialogFormVisible: false
    };
  },
  methods: {
    async getCategoryList() {
      const { data } = await this.$api.getCategoryList();
      this.categorys = data.data;

      if (this.categorys.length) {
        const { children } = this.categorys.slice(0, 1)[0];
        const categoryId = children[0]._id;
        this.findNav(categoryId);
      }
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
    },
    async findNav(id) {
      this.loading = true;
      const data = await this.$api.findNav(id);
      this.data = data.data;
      this.loading = false;
    }
  },
  created() {
    this.getCategoryList();
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-dialog {
  min-width: 320px;
}
.el-submenu .el-menu-item {
  padding: 0;
}
.el-menu-item > a {
  color: rgb(107, 115, 134);
  display: block;
  width: 100%;
  height: 100%;
}
.el-menu-item.is-active > a {
  color: #fff;
}
.csz {
  margin-right: 5px;
}

.add-nav-btn {
  &,
  .el-button {
    border: 0;
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    position: fixed;
    background: #fff;
    right: 10px;
    bottom: 85px;
    z-index: 9999;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
}
[class^="el-icon-"] {
  font-size: 20px;
}
</style>
