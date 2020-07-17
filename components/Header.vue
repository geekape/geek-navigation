<template>
  <div class="header">
    <slot>
      <nuxt-link class="el-icon-s-custom icon-login icon" to="/admin"></nuxt-link>
    </slot>
    <!-- <span class="el-icon-more icon" @click="$emit('handleMoreClick')"></span> -->
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .header {
    padding: 20px;
    background: #fff;
    text-align: right;
    font-size: 14px;
  }
  .icon {
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
  }
  .el-icon-more {
    margin-left: 30px;
  }
</style>
