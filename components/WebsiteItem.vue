<template>
  <el-col :xs="24" :md="6" class="website-item">
    <a class="info" target="_blank" :href="data.href">
      <div class="info-header">
        <el-image class="logo" :src="data.logo" fit="cover" lazy />
        <span class="title">{{ data.name }}</span>
      </div>
      <div class="desc">{{ data.desc || "这个网站什么描述也没有..." }}</div>
    </a>
    <!-- <div class="website-item__footer">
      <span class="iconfont icon-attentionfill"></span>123
      <span class="iconfont icon-appreciatefill"></span>123
    </div> -->
  </el-col>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      }
    }
  }
};
</script>

<style lang="scss">
.website-item {
  font-size: 12px;
  margin-bottom: 10px;
  a {
    color: #999;
  }

  .title {
    color: #3273dc;
    font-size: 16px;
  }

  .iconfont {
    margin-left: 15px;
  }

  .desc {
    margin-top: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__footer {
    border-top: 1px solid #f2f2f2;
    background: #fff;
    padding: 10px 15px;
    text-align: right;
  }
}

.info {
  display: block;
  box-shadow: 1px 2px 3px #f2f6f8;
  border-radius: 6px;
  transition: all 0.3s;
  background: #fff;
  padding: 10px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  &-header {
    display: flex;
    align-items: center;
  }
}

.logo {
  min-width: 35px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 15px;
}
</style>
