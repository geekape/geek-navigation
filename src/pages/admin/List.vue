<template>
  <div>
    <el-table :data="tableData">
      <el-table-column
        label="网站名字"
        width="180"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="网站链接"
        width="180"
        prop="href"
      ></el-table-column>
      <el-table-column
        label="网站描述"
        width="180"
        prop="desc"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >
            修改
          </el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNavPopup: false,
      editItem: {},
      active: 0,
      tableData: [],
      activeName: 'two',
    }
  },
  methods: {
    async getData() {
      const res = await this.$api.getHome()
      this.tableData = res.data
    },
    handleEdit(item) {
      this.isNavPopup = true
      item.classify = this.tableData[index].classify
      item.navId = id
      this.editItem = item
    },
    async handleDelete(id) {
      const data = await this.$api.delNav(id)
      this.$message('删除成功')
      this.getData()
    },
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
.title {
  text-align: left;
  font-size: 14px;
  line-height: initial;
  margin: 20px 0;
}
</style>
