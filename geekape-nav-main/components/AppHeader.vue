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
    <div>
      <el-button icon="el-icon-plus" @click="$emit('showPopup')"
        >添加网站</el-button
      >
      <el-button icon="el-icon-user-solid" @click="$router.push('/login')">{{
        isLogin ? "查看后台" : "登录"
      }}</el-button>
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
  }
};
</script>

<style lang="scss" scoped></style>
