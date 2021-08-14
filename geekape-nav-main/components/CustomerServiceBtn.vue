<template>
  <div class="customer-service-btn">
    <el-dropdown @command="handleCommand">
        <div class="feedback">
          <i class="el-icon-service"></i>
        </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">更新日志</el-dropdown-item>
        <el-dropdown-item command="b">意见反馈</el-dropdown-item>
        <el-dropdown-item command="c">联系我们</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>


  </div>
</template>

<script>
export default {
  name: "CustomerServiceBtn",
  data() {
    return {
      show: false
    }
  },
  methods: {
    handleCommand(command) {
      console.log('click on item ' + command);
      if (command === 'b') {
        window.open('https://support.qq.com/product/330737')
      } else if (command === 'c') {
          window.open('https://geekape.net/about')
      } else if (command === 'a') {
        this.$emit('showLog', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.customer-service-btn {
  width: 60px; height: 60px; background: #4700f1; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  position: fixed;
  cursor: pointer;
  right: 50px;
  bottom: 50px;
  box-shadow: 0 0 20px rgba(#4700f1, .4);
  i {
    color: #fff;
    margin-left: 0;
    font-size: 30px;
  }
}
</style>
