<template>
  <el-container class="user-layout">
    <app-nav-menus
      @handleSubMenuClick="handleSubMenuClick"
      :categorys="categorys"
      :isCollapse="isCollapse"
    />
    <el-container class="body" :style="{ marginLeft: sideBarWidth }">
      <app-header
        @showMenus="isCollapse = !isCollapse"
        @showPopup="showPopup = true"
        :isCollapse="isCollapse"
      />

      <section class="main" v-loading="loading">
        <affiche />
        <div class="website-wrapper" v-for="item in data" :key="item.name">
          <p class="website-title" :id="item._id">{{ item.name }}</p>
          <WebsiteList :list="item.list" />
          <app-nav-list :list="item.list" />
        </div>
      </section>
    </el-container>

    <AddNavPopup :show.sync="showPopup" />
    <Toolbar />

  </el-container>
</template>

<script>
import AppNavMenus from "~/components/AppNavMenus";
import AppHeader from "~/components/AppHeader";
import AppNavList from "~/components/AppNavList";
import AddNavPopup from "~/components/AddNavPopup";

import Affiche from "~/components/Affiche";

import axios from "~/plugins/axios";
import api from "~/api";
export default {
  components: {
    Affiche,
    AppNavList,
    AddNavPopup,
    AppHeader,
    AppNavMenus
  },
  data(Affiche) {
    return {
      showPopup: false,
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
      const { data } = await this.$api.findNav(id);
      this.data = data;
      this.loading = false;
    },
    async handleSubMenuClick(parentId, id) {
      await this.findNav(parentId);
      document.getElementById(id).scrollIntoView();
    }
  },
  async asyncData() {
    const { data: categorys } = await api.getCategoryList();

    const id = categorys[0]._id;
    const { data } = await api.findNav(id);
    return {
      categorys,
      data
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
$sidebar-w: auto;

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

  /deep/ .el-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #333;
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0px 1px 6px rgba(142, 142, 142, 0.1);
    .arrow {
      flex: 1;
      cursor: pointer;
    }
    .arrow i {
      color: #999;
      font-size: 24px;
    }
  }

  .body {
    margin-left: 70px;
  }

  .el-aside {
    background-color: #4700f1;
    color: #6b7386;
    text-align: center;
    height: 100vh;
    transition: all 0.5s;
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    overflow: visible;
    bottom: 0;

    .el-menu--popup::-webkit-scrollbar,
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .el-menu--popup::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      background: #2740ee;
    }
    .el-menu--popup::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      background: #6d7def;
    }

    /deep/ .el-menu,
    /deep/ .el-menu--collapse {
      border: 0;
    }

    &.aside-hide {
      transform: translateX(-$sidebar-w);
    }

    &.aside-show {
      transform: translateX(0);
    }

    .title {
      font-size: 16px;
      padding: 20px 0;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }

  .el-submenu__title,
  .el-menu-item {
    text-align: left;
  }

  .icon-logo {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  .el-container {
    flex-direction: column;
  }
}

@media screen and (max-width: 568px) {
  .user-layout {
    /deep/ .el-header .arrow {
      display: none;
    }
  }
}
@media screen and (min-width: 569px) {
  .user-layout {
    /deep/ .el-header .arrow {
      display: block;
    }
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
