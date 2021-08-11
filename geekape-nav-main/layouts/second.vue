<template>
  <div>
    <header>
      <nuxt-link to="/"><a><img src="/logo-nav.png" /></a></nuxt-link>
    </header>
    <nuxt />
  </div>
</template>

<script>
import AppHeader from "~/components/AppHeader";
export default {
  components: {
    AppHeader
  }
}
</script>
<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0px 1px 6px rgba(#000, .1);
  height: 80px;
  padding: 0 20px;

  img {
    width: 180px;
    filter: invert(1);
  }
}
</style>
