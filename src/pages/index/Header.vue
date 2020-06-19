<template>
  <div class="header">
    <slot>
      <router-link class="el-icon-s-custom icon-login" to="/admin"></router-link>
    </slot>
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
  .icon-login {
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
  }
</style>