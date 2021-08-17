<template>

  <div :style="{ marginLeft: contentMarginLeft }">
    <AppNavMenus
      :categorys="category"
      :show-menu-type="showMenuType"
      @showMenus="toggleMenu2"
    />
    <AppHeader
      @handleShowPopup="showPopup = true"
      @handleShowMenu="toggleMenu"
    />
    <nuxt />
  </div>
</template>

<script>

import layoutMixin from "../mixins/layoutMixin";
import navActionMixin from "../mixins/navActionMixin";

export default {
  mixins: [layoutMixin, navActionMixin],
}
</script>

<style lang="scss" scoped>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

p {
  margin: 0;
}

a[title="站长统计"] {
  display: none;
}

</style>
