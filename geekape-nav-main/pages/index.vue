<template>
  <el-container class="user-layout">
    <AppNavMenus
      @handleSubMenuClick="handleSubMenuClick"
      :categorys="category"
      :show-menu-type="showMenuType"
      @showMenus="toggleMenu2"
    />
    <el-container class="body" :style="{ marginLeft: contentMarginLeft }">
      <AppHeader
        @handleShowPopup="showPopup = true"
        @handleShowMenu="toggleMenu"
      />
      <div class="main" v-loading="loading">
        <affiche />
        <nav-ranking-list :data="navRanking" />

        <div class="website-wrapper" v-for="item in data" :key="item.name">
            <p class="website-title" :id="item._id">{{ item.name }}</p>
            <app-nav-list :list="item.list" />
          </div>
      </div>
    </el-container>

    <AddNavPopup :show.sync="showPopup" />
    <CustomerServiceBtn @showLog="showLog = true" />
    <AppLog :show="showLog" @closeLog="showLog = false" />
  </el-container>
</template>

<script>
import AppNavList from "../components/AppNavList";


import api from "~/api";
import AppSearch from "../components/AppSearch";
import CustomerServiceBtn from "../components/CustomerServiceBtn";
import AppLog from "../components/AppLog";
import layoutMixin from "../mixins/layoutMixin";
import NavRanking from "../components/NavRanking";
import axios from "../plugins/axios";
import {API_NAV_RANKING} from "../api";
import NavRankingList from "../components/NavRankingList";
import Affiche from "../components/Affiche";
export default {
  mixins: [layoutMixin],
  layout: 'second',
  components: {
    Affiche,
    NavRankingList,
    NavRanking,
    AppLog,
    CustomerServiceBtn,
    AppSearch,
    AppNavList,
  },
  data() {
    return {
      loading: false,
      active: "［前端］热门推荐",
      data: [],
      categorys: [],
      navRanking: {
        view: [],
        star: [],
        news: []
      },
      selfIndex: 0,
      isLeftbar: true
    };
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
  },
  mounted() {
    this.$store.commit('saveCategory', this.categorys)
  },
  async asyncData({ store }) {
    const [{ data: categorys }, { data: navRanking }] = await Promise.all([
      api.getCategoryList(),
      axios.get(API_NAV_RANKING)
    ])


    const id = store.state.seletedMenuParentId || categorys[0]._id;
    const { data } = await api.findNav(id);
    return {
      categorys,
      navRanking,
      data
    };
  },
};
</script>

<style lang="scss">

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
    margin-left: 0;
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
