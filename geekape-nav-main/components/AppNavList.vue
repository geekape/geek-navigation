<template>
  <div>
    <el-row class="website" :gutter="20">
      <AppNavItem v-for="item in list" :data="item" :key="item._id" />
    </el-row>
  </div>
</template>

<script>
import AppNavItem from "./AppNavItem";
export default {
  components: {
    AppNavItem
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
