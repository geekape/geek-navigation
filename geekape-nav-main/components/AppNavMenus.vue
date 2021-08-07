<template>
  <el-aside
    :style="{
      width: sideBarWidth,
      overflow: !isCollapse ? 'auto' : 'hidden'
    }"
  >
    <nuxt-link class="title" to="/">
      <img
        v-if="!isCollapse"
        class="icon-logo"
        width="180"
        src="/logo-nav.png"
      />
      <img v-else class="icon-logo" width="45" src="/logo-nav-icon.png" />

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
  </el-aside>
</template>

<script>
export default {
  name: "",
  props: {
    categorys: {
      type: Array,
      default: () => []
    },
    isCollapse: {
      type: Boolean,
      default: false
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
      return !this.isCollapse ? "220px" : "70px";
    }
  },
  methods: {
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

<style lang="scss" scoped></style>
