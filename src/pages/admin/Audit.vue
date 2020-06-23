<template>
  <el-table :data="tableData">
    <el-table-column label="提交日期" width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">
          {{ $dayjs(scope.row.createAt).format('YYYY-MM-DD HH:ss') }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="网站url" width="180" prop="url"></el-table-column>
    <el-table-column
      label="网站分类"
      width="180"
      prop="category.name"
    ></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="openDialog(0, scope.row._id, scope.$index)"
        >
          通过
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="openDialog(1, scope.row._id, scope.$index)"
        >
          拒绝
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      isNavPopup: false,
      editItem: {},
      active: 0,
      tableData: [],
      tableNavData: [],
      activeName: 'two',
    }
  },
  methods: {
    async getData() {
      const res = await this.$api.getAuditList()
      this.tableData = res.data.data
    },
    // 拒绝－直接删除提交
    async delAuditNav(id) {
      const res = await this.$api.delAuditNav({ id: id })
    },
    // 新增－展示到前台
    async addNav(data) {
      const res = await this.$api.addNav(data)
    },
    openDialog(type, id, index) {
      const that = this
      if (type) {
        // 拒绝
        this.$confirm('确认拒绝这个提交？')
          .then((_) => {
            this.$message('删除成功')
            this.delAuditNav(id)
            this.tableData.splice(index, 1)
          })
          .catch((_) => {})
      } else {
        const filterData = this.tableData.filter((item) => item._id == id)[0]
        const { classify, name, href, desc, logo, _id } = filterData
        const data = {
          id: _id,
          classify: classify,
          icon: 'el-icon-edit',
          sites: {
            name: name,
            href: href,
            desc: desc,
            logo: logo,
          },
        }
        this.$confirm('确认添加到首页？')
          .then((_) => {
            this.$message('添加成功')
            this.addNav(data)
            this.tableData.splice(index, 1)
          })
          .catch((_) => {})
      }
    },
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped></style>
