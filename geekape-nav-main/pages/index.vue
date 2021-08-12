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
export default {
  components: {
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
