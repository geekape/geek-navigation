<template>
  <div>
    <el-row class="website" :gutter="20">
      <WebsiteItem v-for="item in list" :data="item" :key="item._id" />
    </el-row>
  </div>
</template>

<script>
import WebsiteItem from "./WebsiteItem";
export default {
  components: {
    WebsiteItem
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.website {
}
</style>
