<template>
  <div class="app-log">
    <el-dialog title="更新日志" :visible="show" @close="$emit('closeLog')">
      <ul>
        <li>feat: 更新日志</li>
        <li>feat: 导航标签功能</li>
        <li>refactor: 接口增加基础的controller</li>
        <li>fix: 审核时间处理</li>
        <li>refactor: 前台输入链接自动爬取优化</li>
        <li>refactor: 前台站内搜索</li>
        <li>feat: 控制分类是否显示到前台菜单</li>
        <li>refactor: 优化前台侧边栏</li>
        <li>feat: 搜索导航</li>
        <li>feat: 导航详情页</li>
        <li>refactor: nav卡片样式优化</li>
        <li>refactor: 规范前后台接口返回值</li>
        <li>refactor: 重构极客猿导航接口</li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AppLog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      logs: [
        {
          time: '2021-08-13',
          content: '【新增】标签功能',
        },

        {
          time: '2021-08-12',
          content: '【新增】站内搜索，控制分类显示',
        },
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
.app-log {
  li {
    list-style: disc;
    line-height: 30px;
    font-size: 15px;
  }
}
</style>
