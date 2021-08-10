<template>
  <el-header>
    <div class="arrow">
      <i
        @click="$emit('showMenus')"
        class="el-icon-s-fold"
        v-if="!isCollapse"
      ></i>
      <i @click="$emit('showMenus')" class="el-icon-s-unfold" v-else></i>
    </div>
    <div class="button-item">
      <el-button icon="el-icon-question" @click="onJumpFeedback">意见反馈</el-button>
    </div>
    <div class="button-item">
      <el-button icon="el-icon-plus" @click="$emit('showPopup')"
        >添加网站</el-button
      >
    </div>
  </el-header>
</template>

<script>
export default {
  name: "",
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
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

</style>
