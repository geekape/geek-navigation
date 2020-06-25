<template>
  <el-col :xs="24" :md="6" class="website-item">
    <a class="info" target="_blank" :href="data.href">
      <div class="info-header">
        <el-image class="logo" :src="data.logo" fit="cover" lazy />
        <span class="title">{{ data.name }}</span>
      </div>
      <div class="desc">{{ data.desc || '这个网站什么描述也没有...' }}</div>
    </a>
  </el-col>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.website-item {
  font-size: 16px;
  margin-bottom: 10px;
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
  justify-content: start;
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

@mixin text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.title {
  color: #3273dc;
  @include text-overflow;
}

.desc {
  color: gray;
  font-size: 12px;
  padding-top: 10px;
  @include text-overflow;
}
</style>
