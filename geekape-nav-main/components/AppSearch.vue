<template>
  <div class="app-search">
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
      suffix-icon="el-icon-search"
    ></el-autocomplete>
  </div>
</template>

<script>
import axios from "../plugins/axios";
import {API_NAV} from "../api";

export default {
  name: "AppSearch",
  data() {
    return {
      restaurants: [],
      state: '',
      timeout:  null
    }
  },
  methods: {
    async querySearchAsync(query, cb) {
      if (query !== '') {
        const res = await axios.get(API_NAV + `?keyword=${query}`)
        if (Array.isArray(res.data)) {
          res.data = res.data.map(item=> (item.value = item.name, item))
          cb(res.data)
        }
      } else {
        cb([])
      }
    },
    handleSelect(item) {
      window.open(item.href)
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
