<template>
  <el-header>
    <AppSearch />
    <div>
      <el-tooltip content="意见反馈"><i class="el-icon-question" @click="onJumpFeedback"></i></el-tooltip>
      <el-tooltip content="推荐网站"><i class="el-icon-circle-plus" @click="$emit('showPopup')"></i></el-tooltip>
    </div>
  </el-header>
</template>

<script>
import AppSearch from "./AppSearch";
export default {
  name: "AppHeader",
  components: {AppSearch},
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onJumpFeedback() {
      window.open('https://support.qq.com/product/330737')
    }
  }
};
</script>

<style lang="scss" scoped>
.button-item {
  margin-left: 10px;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0px 1px 6px rgba(#000, .1);

  .arrow {
    flex: 1;
    cursor: pointer;
  }
  .arrow i {
    color: #999;
    font-size: 24px;
  }

  i {
    font-size: 25px;
    margin-left: 30px;
    color: #999;
    cursor: pointer;
  }
}
</style>
