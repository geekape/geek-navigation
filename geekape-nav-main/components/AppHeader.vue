<template>
  <el-header>
    <AppSearch />


    <el-row type="flex">
      <el-col>
        <el-tooltip content="推荐网站"><i class="el-icon-circle-plus" @click="$emit('showPopup')"></i></el-tooltip>
      </el-col>
    </el-row>
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
    margin-left: 2rem;
    color: #999;
    cursor: pointer;
  }
}


@media screen and (max-width: 568px) {
  .app-search {
    /deep/ .el-select {
      display: none;
    }
  }
}
@media screen and (min-width: 569px) {
  .app-search {
    /deep/ .el-select {
      display: block;
    }
  }
}
</style>
