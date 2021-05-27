<template>
  <user-layout
    :categorys="categorys"
    @click="findNav($event.index)"
    @handleSubMenuClick="handleSubMenuClick"
  >
    <Affiche />
    <section class="main" v-loading="loading">
      <div class="website-wrapper" v-for="item in data" :key="item.name">
        <p class="website-title" :id="item._id">{{ item.name }}</p>
        <WebsiteList :list="item.list" />
      </div>
    </section>
    <!-- <Toolbar @addWebsite="dialogFormVisible=true" /> -->

  </user-layout>
</template>

<script>
import WebsiteList from "~/components/WebsiteList";
import Toolbar from "~/components/Toolbar";
import userLayout from "~/layouts/user-layout";
import Affiche from "~/components/Affiche";

import axios from "~/plugins/axios";
import api from "~/api";
export default {
  components: {
    userLayout,
    Affiche,
    WebsiteList,
    Toolbar,
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
      carouselActive: 0,
      isLeftbar: true,
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
    },
    async handleSubMenuClick(parentId, id) {
      await this.findNav(parentId)
      document.getElementById(id).scrollIntoView()
    },
  },
  async asyncData() {
    const { data: categorys } = await api.getCategoryList()

    const id = categorys[0]._id;
    const websites = await api.findNav(id)
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

.enpty {
  font-size: 18px;
  text-align: center;
}

</style>
