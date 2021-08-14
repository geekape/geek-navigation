<template>
  <el-container class="user-layout">

    <app-nav-menus
      @handleSubMenuClick="handleSubMenuClick"
      :categorys="categorys"
      :isCollapse="isCollapse"
      @showMenus="isCollapse = !isCollapse"
    />
    <el-container class="body" :style="{ marginLeft: sideBarWidth }">
      <app-header
        @showPopup="showPopup = true"
      />
      <affiche />

      <section class="main" v-loading="loading">
        <div class="website-wrapper" v-for="item in data" :key="item.name">
          <p class="website-title" :id="item._id">{{ item.name }}</p>
          <WebsiteList :list="item.list" />
          <app-nav-list :list="item.list" />
        </div>
      </section>
    </el-container>

    <AddNavPopup :show.sync="showPopup" />
    <Toolbar />
    <CustomerServiceBtn @showLog="showLog = true" />
    <AppLog :show="showLog" @closeLog="showLog = false" />
  </el-container>
</template>

<script>
import AppNavMenus from "../components/AppNavMenus";
import AppHeader from "../components/AppHeader";
import AppNavList from "../components/AppNavList";
import AddNavPopup from "../components/AddNavPopup";

import Affiche from "~/components/Affiche";

import api from "~/api";
import AppSearch from "../components/AppSearch";
import CustomerServiceBtn from "../components/CustomerServiceBtn";
import AppLog from "../components/AppLog";
export default {
  components: {
    AppLog,
    CustomerServiceBtn,
    AppSearch,
    Affiche,
    AppNavList,
    AddNavPopup,
    AppHeader,
    AppNavMenus
  },
  data(Affiche) {
    return {
      showPopup: false,
      showLog: false,
      isCollapse: true,

      loading: false,
      active: "［前端］热门推荐",
      data: [],
      categorys: [],
      selfIndex: 0,
      isLeftbar: true
    };
  },
  computed: {
    sideBarWidth() {
      return !this.isCollapse ? "220px" : "70px";
    }
  },
  methods: {
    async getCategoryList() {
      const { data: categorys } = await this.$api.getCategoryList();
      this.categorys = categorys;

      if (Array.isArray(categorys)) {
        const categoryId = categorys[0]._id;
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
      const { data } = await this.$api.findNav(id);
      this.data = data;
      this.loading = false;
    },
    async handleSubMenuClick(parentId, id) {
      await this.findNav(parentId);
      document.getElementById(id).scrollIntoView();
    }
  },
  mounted() {
    this.$store.commit('saveCategory', this.categorys)
  },
  async asyncData({ store }) {
    const { data: categorys } = await api.getCategoryList();

    const id = store.state.seletedMenuParentId || categorys[0]._id;
    const { data } = await api.findNav(id);
    return {
      categorys,
      data
    };
  },
  // created() {
  //   this.getCategoryList()
  //   console.log(process.env.navUrl, "process.env");
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.el-container {
  flex-direction: column;
}
.user-layout {
  position: relative;
  .footer {
    position: fixed;
    left: 200px;
    right: 0;
    bottom: 0;
    font-size: 14px;
    color: #999;
  }
  /deep/ .el-submenu__title i {
    color: #fff;
  }

  .body {
    margin-left: 70px;
  }
}


/deep/ .el-menu--popup-right-start {
  height: 500px !important;
  overflow: auto;
}
body {
  .el-menu--popup-right-start {
    background-color: #fff !important;
    .el-menu-item {
      background-color: #fff !important;
      color: #333 !important;
      &:hover {
        background-color: #ecf5ff !important;
      }
    }
  }
}

.main {
  padding: 20px;
  position: relative;
}
.website-wrapper {
  .website-title {
    font-size: 14px;
    margin: 50px 0 20px;
    background: #fff;
    display: inline-block;
    padding: 5px 10px;
    border-top-right-radius: 15px;
  }
}
</style>
