<template>
  <el-container class="user-layout">
    <el-aside :class="isLeftbar ? 'aside-show' : 'aside-hide'">
      <nuxt-link class="title" to="/">
        <img class="icon-logo" src="/favicon.ico" />
        <span>猿梦极客导航后台</span>
      </nuxt-link>
      <el-row>
        <el-col :span="24">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#30333c"
            text-color="#6b7386"
            active-text-color="#fff"
            default-active="0-0"
            @open="handleSubMenuClick"
            unique-opened
          >
            <el-submenu
              v-for="(item, index) in categorys"
              :key="item._id"
              :index="item._id"
              style="text-align: left"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </template>
              <el-menu-item
                :index="`${index}-${idx}`"
                v-for="(nav, idx) in item.children"
                :key="nav._id"
                @click="handleMenuItemClick(nav._id)"
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
    </el-aside>
    <el-container>
      <el-header>
        <span
          :class="!isLeftbar ? `el-icon-menu` : `el-icon-error`"
          @click="isLeftbar = !isLeftbar"
          style="font-size: 30px"
        ></span>
      </el-header>
      <el-main>
        <slot></slot>
      </el-main>
      <!-- <el-footer class="footer">
        <div class="copyright">
          <div>
            Copyright © 2019- 2050
            <a href="https://github.com/geekape/geek-navigation">
              导航源码下载
            </a>
          </div>
        </div>
      </el-footer> -->
    </el-container>
  </el-container>
</template>

<script>
export default {
  props: {
    categorys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isLeftbar: true
    };
  },
  methods: {
    handleSubMenuClick(e) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.$emit('handleSubMenuClick', e)
    },
    handleMenuItemClick(id) {
      if (document.body.clientWidth <= 568) {
        this.isLeftbar = false;
      }
      debugger
      document.getElementById(id).scrollIntoView()
    },
    handleWindowSize() {
      const width = document.body.clientWidth;
      this.isLeftbar = width < 568 ? false : true;
    }
  },
  mounted() {
    this.handleWindowSize()
    window.addEventListener('resize', this.handleWindowSize);
  }
};
</script>

<style lang="scss" scoped>
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

  .el-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #333;
    display: none;
    background: #fff;
  }

  .el-aside {
    width: 250px !important;
    background-color: #30333c;
    color: #6b7386;
    text-align: center;
    height: 100vh;
    transition: all 0.5s;
    overflow-x: hidden;
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;

    &.aside-hide {
      transform: translateX(-250px);
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

  .el-main {
    padding-bottom: 80px;
    margin-left: 250px;
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
    .el-header {
      display: flex;
    }
    .el-main {
      margin-left: 0;
    }
  }
}
@media screen and (min-width: 569px) {
  .user-layout {
    .el-header {
      display: none;
    }
    .el-main {
      margin-left: 250px;
    }
  }
}
</style>
