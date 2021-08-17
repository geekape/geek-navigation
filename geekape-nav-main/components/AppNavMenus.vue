<template>
  <el-aside
    :style="{
      width: sideBarWidth,
    }"
  >
    <nuxt-link class="title" to="/">
      <img
        v-show="!isCollapse"
        class="icon-logo"
        width="180"
        src="/logo-nav.png"
      />
      <img v-show="isCollapse" class="icon-logo" width="45" src="/logo-nav-icon.png"/>

      <!-- <span>猿梦极客导航后台</span> -->
    </nuxt-link>

    <slot name="sidebar">
      <el-row>
        <el-col :span="24">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#4700f1"
            text-color="#fff"
            active-text-color="#a27cff"
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

    <div class="sidebar-fix">
      <ul>
        <li class="item" @click="$emit('showMenus')">
          <i
            class="el-icon-s-fold"
            v-if="!isCollapse"
          ></i>
          <i class="el-icon-s-unfold" v-else></i>
        </li>
      </ul>
    </div>
  </el-aside>
</template>

<script>
export default {
  name: "AppNavMenus",
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    categorys: {
      type: Array,
      default: () => []
    },
    showMenuType: {
      type: String,
      default: 'half'
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      defaultActive: "0-0",
      selectedCategoryId: ""
    };
  },
  computed: {
    sideBarWidth() {
      if (this.showMenuType == 'half') {
        return '70px'
      } else if (this.showMenuType == 'all') {
        return '220px'
      } else {
        return 0
      }
    },
    isCollapse() {
      return this.showMenuType === 'half'
    }
  },
  methods: {
    handleMenuItemClick(parentId, id) {
      this.$store.commit('saveSeletedId', {
        parentId,
        id,
      })

      if (this.$route.path.includes('/nav')) {
        this.$router.push('/')
        return
      }
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

.sidebar-fix {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;

  ul {
    padding: 0;
  }

  .item {
    padding: 10px 15px;
    text-align: left;
    cursor: pointer;
    background: $color-primary;

    i {
      font-size: 20px;
      color: #fff;
    }
  }
}

.el-aside {
  overflow: hidden;
  .el-menu-vertical-demo.el-menu {
    height: 100vh;
    overflow-y: auto;
    padding-bottom: 100px;
  }
  .el-menu--popup::-webkit-scrollbar,
  .el-menu-vertical-demo.el-menu::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .el-menu--popup::-webkit-scrollbar-thumb,
  .el-menu-vertical-demo.el-menu::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    background: rgba($color-primary, .2);
  }

  .el-menu--popup::-webkit-scrollbar-track,
  .el-menu-vertical-demo.el-menu::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: $color-primary;
  }

  background-color: $color-primary;
  color: #6b7386;
  text-align: center;
  transition: all 0.5s;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  .el-submenu__title i {
    color: #fff;
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

  .el-submenu__title,
  .el-menu-item {
    text-align: left;
  }
}

@media screen and (max-width: 568px) {
  .el-aside {
    width: 0;
  }

  .app-search,
  .sidebar-fix {
    display: none;
  }
}
@media screen and (min-width: 569px) {
  .el-aside {
    width: 70px;
  }
  .app-search,
  .sidebar-fix {
    display: block;
  }
}
</style>
