<template>
  <div class="app-search">
    <el-select
      v-model="value"
      filterable
      remote
      reserve-keyword
      placeholder="站内搜索"
      :remote-method="remoteMethod"
      @change="onChange"
      :loading="loading">
      <el-option
        v-for="item in options"
        :key="item.href"
        :label="item.name"
        :value="item.href">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import axios from "../plugins/axios";
import {API_NAV} from "../api";

export default {
  name: "AppSearch",
  data() {
    return {
      options: [],
      value: '',
      list: [],
      loading: false,
    }
  },
  methods: {
    async remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        const res = await axios.get(API_NAV + `?keyword=${query}`)
        this.loading = false
        this.options = res?.data
      } else {
        this.options = [];
      }
    },
    onChange(url) {
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-search {
  display: flex;
  justify-content: center;
  .el-select {
    width: 300px;
  }
  .el-input__inner  {
    border: 1px solid #dfe1e5;
    box-shadow: none;
    background: #fff;
  }

  /deep/ .el-select .el-input.is-focus .el-input__inner {
    border-color: #dfe1e5;
    box-shadow: 0 0 20px rgba(#000, .1);
  }
}
</style>
