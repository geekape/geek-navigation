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
  display: flex;
  justify-content: center;
  align-items: center;
  .el-button {
  cursor: pointer;
    width: 40px;
    height: 40px;
  }
}
[class^=el-icon-] {
  font-size: 20px;
}
</style>

