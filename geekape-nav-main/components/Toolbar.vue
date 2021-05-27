<template>
  <div class="toolbar">
    <div class="toolbar-item login">
      <el-button>
        <nuxt-link
          class="el-icon-s-custom icon-login icon"
          to="/admin"
        ></nuxt-link>
      </el-button>
    </div>
    <div class="toolbar-item add-nav-btn">
      <el-tooltip
        class="item"
        effect="dark"
        content="添加网站"
        placement="left-start"
      >
        <el-button  @click="$emit('addWebsite')">
          <i class="icon el-icon-plus"></i>
        </el-button>
      </el-tooltip>
    </div>
    <div class="toolbar-item backtop">
      <el-tooltip
        class="item"
        effect="dark"
        content="返回顶部"
        placement="left-start"
      >
      <el-button>
        <i class="icon el-icon-upload2"></i>
      </el-button>
      </el-tooltip>
    </div>

  </div>
</template>

<script>
import BackTop from "./BackTop";
export default {
  components: {
    BackTop
  },
  data: {}
};
</script>

<style lang="scss" scoped>
$min-bottom: 30px;
$size: 40px;
.toolbar {
  &-item {
    position: fixed;
    bottom: $min-bottom;
    right: 0;
    .el-button {
      border: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      z-index: 9999;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      width: $size;
      height: $size;
      border-radius: 0;
    }
  }
  &-item.add-nav-btn {
    bottom: 170px;
    bottom: $min-bottom + ($size + 20px) * 2;
  }
  &-item.login {
    bottom: $min-bottom + $size + 20px;
  }
}
</style>
