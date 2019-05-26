<template>
  <a class="item" target="_blank" :href="data.href">
      <div class="logo">
        <el-image :src="data.logo" fit="cover" lazy></el-image>
        <span>{{data.name}}</span>
      </div>
      <div class="desc">{{data.desc || '这个网站什么描述也没有...'}}</div>
  </a>
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>

<style lang="scss" scoped>

.main {
  .box {
    overflow: hidden;
    margin: 20px 30px;
    background: #fff;
    padding-bottom: 20px;
    .sub-category {
      > div {
        padding: 12px 0 0 2.1%;
        font-size: 18px;
      }
    }
    .item {
      width: 20%;
      border: 1px solid #e4ecf3;
      box-shadow: 1px 2px 3px #f2f6f8;
      border-radius: 6px;
      background: #fff;
      padding: 10px;
      min-width: 200px;
      margin: 22px 0 0 2.1%;
      float: left;
      overflow: hidden;
      transition: all 0.3s;
      &:hover {
        transform: translateY(-5px);
      }
      .no-logo {
        color: #3273dc;
        font-weight: bold;
        font-size: 14px;
      }
      .logo {
        align-items: center;
        display: flex;
        height: 40px;
        position: relative;
        font-size: 14px;
        font-weight: 700;
        color: #3273dc;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 0.1rem;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
      .desc {
        color: gray;
        font-size: 12px;
        padding-top: 10px;
        height: 35px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}

.el-image {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 5px;
}
</style>


