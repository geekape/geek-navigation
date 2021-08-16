<template>
  <a :href="data.href" target="_blank" class="nav-ranking">
    <el-image class="logo" :src="data.logo" />
    <span class="name">{{ data.name }}</span>
    <span class="widget"> {{ data[countType] }}</span>
    <span class="iconfont icon-attentionfill" v-if="countType == 'view'"></span>
    <span class="iconfont icon-appreciatefill" v-if="countType == 'star'"></span>
  </a>
</template>

<script>
export default {
  name: "NavRanking",
  props: {
    data: {
      type: Object,
      default: {}
    },
    countType: {
      type: String,
      default: 'createTime'
    }
  },
}
</script>

<style lang="scss" scoped>
.nav-ranking {
  align-items: center;
  color: #333;
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
  .logo {
    min-width: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .name {
    flex: 1;
    font-weight: 500;
    font-size: 14px;
  }
  .iconfont{
    margin-left: 4px;
  }
  &:hover {
   color: $color-primary;
  }
}
</style>
