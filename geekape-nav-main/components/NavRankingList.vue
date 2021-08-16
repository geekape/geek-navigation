<template>
  <div class="nav-ranking-list">
    <el-row :gutter="20">
      <el-col :md="8" :sm="12">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>最新导航</span>
          </div>
          <div v-for="item in data.news" class="text item">
           <nav-ranking :data="item" />
          </div>
        </el-card>
      </el-col>
      <el-col :md="8" :sm="12">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>点击最多导航</span>
          </div>
          <div v-for="item in data.view" class="text item">
            <nav-ranking :data="item" count-type="view" />
          </div>
        </el-card>
      </el-col>
      <el-col :md="8" :sm="12">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>点赞最多导航</span>
          </div>
          <div v-for="item in data.star" class="text item">
            <nav-ranking :data="item" count-type="star" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavRanking from "./NavRanking";
export default {
  name: "NavRankingList",
  components: {NavRanking},
  props: {
    data: {
      type: Object,
      default: {
        view: [],
        star: [],
        news: []
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.nav-ranking-list {
  .el-card {
    margin-top: 30px;
  }
  .el-card__header {
    span {
      font-size: 18px;
      font-weight: 500;
    }
  }
}
</style>
