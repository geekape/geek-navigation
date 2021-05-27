<template>
  <el-container class="user-layout">
    <el-aside
      :style="{
        width: sideBarWidth,
        overflow: !isCollapse ? 'auto' : 'hidden'
      }"
    >
      <nuxt-link class="title" to="/">
        <img class="icon-logo" src="/favicon.ico" />
        <!-- <span>猿梦极客导航后台</span> -->
      </nuxt-link>

      <slot name="sidebar">
        <el-row>
          <el-col :span="24">
            <el-menu
              class="el-menu-vertical-demo"
              background-color="#2740ee"
              text-color="#fff"
              active-text-color="#03a9f4"
              :default-active="defaultActive"
              unique-opened
              :collapse="isCollapse"
            >
              <el-submenu
                v-for="(item, index) in categorys"
                :key="item._id"
                :index="item._id"
                style="text-align: left"
              >
                <template slot="title">
                  <i
                    :class="item.icon ? item.icon : `el-icon-eleme icon-title`"
                  ></i>
                  <span slot="title">{{ item.name }}</span>
                </template>
                <el-menu-item
                  :index="`${index}-${idx}`"
                  v-for="(nav, idx) in item.children"
                  :key="nav._id"
                  @click="handleMenuItemClick(item._id, nav._id)"
                >
                  <a>
                    <i :class="nav.icon"></i>
                    <span slot="title">{{ nav.name }}</span>
                  </a>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </slot>
    </el-aside>
    <el-container class="body" :style="{ marginLeft: sideBarWidth }">
      <el-header>
        <slot name="header">
          <div class="arrow">
            <i
              @click="isCollapse = true"
              class="el-icon-s-fold"
              v-if="!isCollapse"
            ></i>
            <i
              @click="isCollapse = false"
              class="el-icon-s-unfold"
              v-else
            ></i>
          </div>
          <el-button icon="el-icon-plus" @click="dialogFormVisible = true"
            >添加网站</el-button
          >
          <el-button
            icon="el-icon-user-solid"
            @click="$router.push('/admin')"
            >{{ isLogin ? "查看后台" : "登录" }}</el-button
          >
        </slot>
      </el-header>

      <el-main>
        <slot></slot>
      </el-main>
    </el-container>

    <AddNavPopup :show.sync="dialogFormVisible" />
  </el-container>
</template>

<script>
import AddNavPopup from "~/components/AddNavPopup";
export default {
  components: {
    AddNavPopup
  },
  props: {
    categorys: {
      type: Array,
      default: () => []
    },
    collapse: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      isCollapse: this.collapse,
      defaultActive: "0-0",
      selectedCategoryId: ""
    };
  },
  computed: {
    isLogin() {
      if (process.server) return false;
      return this.$storage.get("TOKEN");
    },
    sideBarWidth() {
      return !this.isCollapse ? "200px" : "70px";
    }
  },
  methods: {
    handleSubMenuClick(e) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.$emit("handleSubMenuClick", e);
    },
    handleMenuItemClick(parentId, id) {
      if (this.selectedCategoryId === parentId) {
        document.getElementById(id).scrollIntoView();
        return;
      }
      this.selectedCategoryId = parentId;
      this.$emit("handleSubMenuClick", parentId, id);
    }
  }
};
</script>

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

  .el-header {
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
    background-color: #2740ee;
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

    .el-menu--collapse {
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
    .arrow {
      display: none;
    }
  }
}
@media screen and (min-width: 569px) {
  .user-layout {
    .arrow {
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
</style>
