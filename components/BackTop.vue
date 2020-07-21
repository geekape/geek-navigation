<template>
  <div class="backtop" @click="goTop">
    <el-tooltip class="item" effect="dark" content="返回顶部" placement="left-start">
      <el-button>
        <i class="el-icon-upload2"></i>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  methods: {
    goTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-button,
.backtop {
  border: 0;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: #fff;
  right: 10px;
  bottom: 30px;
  z-index: 9999;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
[class^=el-icon-] {
  font-size: 20px;
}
</style>

