<template>
  <el-header>
      <div>
        <img class="header-logo" src="/logo-nav.png" />
      </div>
      <el-row type="flex">
        <el-col>
          <el-tooltip content="推荐网站"><i class="el-icon-circle-plus" @click="$emit('handleShowPopup')"></i></el-tooltip>
        </el-col>
        <el-col class="menu-toggle-btn">
          <i class="el-icon-menu" @click="$emit('handleShowMenu')"></i>
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

  .header-logo {
    width: 150px;
    filter: invert(1);
  }
}


@media screen and (max-width: 568px) {
  .app-search {
    /deep/ .el-select {
      display: none;
    }
  }

  .header-logo,
  .menu-toggle-btn {
    display: block;
  }
}
@media screen and (min-width: 569px) {
  .app-search {
    /deep/ .el-select {
      display: block;
    }
  }

  .header-logo,
  .menu-toggle-btn {
    display: none;
  }
}
</style>
