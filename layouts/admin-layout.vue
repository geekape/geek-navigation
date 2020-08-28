<template>
  <user-layout :collapse="false">

    <template v-slot:header>
      <el-button
        icon="el-icon-platform-eleme"
        @click="$router.push('/')"
        >Home</el-button
      >
    </template>
    <template v-slot:sidebar>
      <el-row>
        <el-col :span="24">
          <el-menu
            router
            class="el-menu-vertical-demo"
            background-color="#2740ee"
            text-color="#fff"
            active-text-color="#03a9f4"
            :default-active="$route.path"
            unique-opened
          >
            <el-menu-item index="/admin">
              <span slot="title">用户提交</span>
            </el-menu-item>
            <el-menu-item index="/admin/list">
              <span slot="title">所有网站</span>
            </el-menu-item>
            <el-menu-item index="/admin/category">
              <span slot="title">分类管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </template>
    <slot></slot>
  </user-layout>
</template>

<script>
import userLayout from "./user-layout";
export default {
  components: {
    userLayout
  }
};
</script>

<style lang="scss" scoped>
/* .el-header,
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header {
  text-align: right;
}

.el-aside {
  background-color: #30333c;
  color: #6b7386;
  text-align: center;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;

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
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  margin-left: 200px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.icon-logo {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.left-bar {
  .title {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #30333c;
    color: white;
    font-size: 18px;
    position: sticky;
    top: 0;
    border-bottom: 2px solid hsla(0,0%,100%,.04);
  }
}

.nav {
  .item {
    a {
      color: white;
    }
  }
} */
</style>
