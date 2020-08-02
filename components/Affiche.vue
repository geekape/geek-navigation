<template>
  <div class="affiche">
    <el-carousel
      height="30px"
      direction="vertical"
      indicator-position="none"
      :setActiveItem="carouselActive"
    >
      <el-carousel-item>
        <p class="medium">
          极客猿梦导航，专注独立开发者的导航站。<a
            class="link"
            href="https://github.com/geekape/geek-navigation"
            >开源去下载</a
          >
        </p>
      </el-carousel-item>
      <el-carousel-item>
        <p class="medium">
          一个好的产品要经历千锤百炼，我们需要你的建议。<a
            class="link"
            href="https://github.com/geekape/geek-navigation"
            >去围观</a
          >
        </p>
      </el-carousel-item>
    </el-carousel>
    <!-- <div class="icon-group">
        <nuxt-link
          class="icon el-icon-s-custom icon-login icon"
          to="/admin"
        ></nuxt-link>
        <i class="icon el-icon-circle-plus" @click="dialogFormVisible=true"></i>
      </div> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.affiche {
  padding: 10px 20px;
  background: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 16px;
  .el-carousel {
    flex: 1;
  }
  .el-carousel__item {
    line-height: 30px;
  }

  .el-carousel__button {
    width: 20px;
    height: 20px;
  }
  .icon-group {
    display: flex;
    float: right;
    color: #999;
    span {
      border: 1px solid #999;
      margin-left: 10px;
      cursor: pointer;
    }
    .icon {
      color: #333;
      margin-left: 20px;
    }
  }
  .link {
    color: #2a97ff;
    text-decoration: underline;
  }
}
</style>
