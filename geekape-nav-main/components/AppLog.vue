<template>
  <el-dialog title="更新日志" :visible="show" @close="$emit('closeLog')">
    <el-timeline>
      <el-timeline-item :timestamp="item.time" placement="top" v-for="item in logs" :key="item.content">
        <el-card>
          <h4>{{item.content}}}</h4>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
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
          time: '2021-08-12',
          content: '【新增】站内搜索，分类显示',
        },

      ]
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
