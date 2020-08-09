<template>
    <el-carousel
      height="30px"
      direction="vertical"
      indicator-position="none"
      class="affiche"
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
      <el-carousel-item>
        <p class="medium">
          支持提交网站带个人信息了，欢迎大家提交网站
        </p>
      </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.affiche {
  width: 100%;
  font-size: 14px;
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
