<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-select v-model="selectedStatus" placeholder="请选择状态">
          <el-option
            :value="item.value"
            :label="item.label"
            v-for="item in status"
            :key="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" @click="clear">一键拒绝审核列表</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column label="提交日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">
            {{ $dayjs(scope.row.createAt).format('YYYY-MM-DD HH:ss') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="网站名称"
        width="180"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="网站描述"
        width="180"
        prop="desc"
      ></el-table-column>
      <el-table-column
        label="网站链接"
        width="180"
        prop="url"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openDialog(0, scope.row._id, scope.$index)"
            v-if="!scope.row.status"
          >
            通过
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="openDialog(1, scope.row._id, scope.$index)"
            v-if="!scope.row.status"
          >
            拒绝
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
      loading: false,
      status: [
        { value: 0, label: '审核中' },
        { value: 1, label: '已通过' },
        { value: 2, label: '已拒绝' },
      ],
      selectedStatus: 0,
      isNavPopup: false,
      editItem: {},
      active: 0,
      tableData: [],
      tableNavData: [],
      activeName: 'two',
    }
  },
  methods: {
    async getData(status) {
      this.loading = true
      const res = await this.$api.getAuditList(status)
      this.tableData = res.data
      this.loading = false
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
        let filterData = this.tableData.filter((item) => item._id == id)[0]
        filterData.auditId = filterData._id
        this.$confirm('确认添加到首页？')
          .then((_) => {
            this.$message('添加成功')
            this.addNav(filterData)
            this.tableData.splice(index, 1)
          })
          .catch((_) => {})
      }
    },
    clear() {
      this.$confirm('确认清空审核列表？').then((res) => {
        this.$api.fastRejectAudit()
        this.getData()
      })
    },
  },
  watch: {
    selectedStatus(val) {
      this.getData(val)
    },
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 20px;
}
</style>
