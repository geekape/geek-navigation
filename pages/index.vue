<template>
  <user-layout :categorys="categorys" @click="findNav($event)">
    <section class="main">
      <div id="mainContent">
        <WebsiteList v-loading="loading" :list="data" />
      </div>
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
    <div class="login">
      <el-button>
        <nuxt-link
          class="el-icon-s-custom icon-login icon"
          to="/admin"
        ></nuxt-link>
      </el-button>
    </div>

    <AddNavPopup :show.sync="dialogFormVisible" />

    <el-drawer :visible.sync="isDrawer" direction="rtl">
      <el-tabs>
        <el-tab-pane label="我的分类" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="最近添加" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </el-drawer>
  </user-layout>
</template>

<script>
import AddNavPopup from "~/components/AddNavPopup";
import Header from "~/components/Header";
import WebsiteList from "~/components/WebsiteList";
import userLayout from "~/layouts/user-layout";
import axios from "~/plugins/axios";
export default {
  components: {
    userLayout,
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
      this.data = data;
      this.loading = false;
    }
  },
  async asyncData() {
    const { data: categorys } = await axios.get("/api/category/list");

    const id =
      categorys[0] && categorys[0].children[0] && categorys[0].children[0]._id;
    const websites = await axios.post("/api/nav/find", {
      id
    });
    return {
      categorys,
      data: websites
    };
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        if (window.screenWidth < 481) {
          this.isLeftbar = false;
        } else {
          this.isLeftbar = true;
        }
      })();
    };
    window.onresize();
  },
  created() {
    console.log(process.env.navUrl, "process.env");
  }
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

.login,
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
    bottom: 25px;
    z-index: 9999;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
}
.login {
  .el-button {
    bottom: 80px;
  }
}
[class^="el-icon-"] {
  font-size: 20px;
}
</style>
