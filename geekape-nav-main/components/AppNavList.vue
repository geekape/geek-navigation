<template>
  <div>
    <el-row class="website" :gutter="20">
      <AppNavItem
        v-for="item in list"
        :data="item"
        :key="item._id"
        @handleNavClick="handleNavClick"
        @handleNavStar="handleNavStar"
      />
    </el-row>
  </div>
</template>

<script>
import AppNavItem from "./AppNavItem";
import navActionMixin from "../mixins/navActionMixin";

export default {
  name: 'AppNavList',
  mixins: [navActionMixin],
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
