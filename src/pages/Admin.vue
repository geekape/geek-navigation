<template>
  <section class="admin">
    <header class="admin-header">
      <h2>极客猿梦导航后台</h2>
    </header>
    <el-table :data="tableData">
      <el-table-column label="提交日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatTime(scope.row.time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="网站名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="网站分类" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.classify }}</span>
        </template>
      </el-table-column>
      <el-table-column label="网站链接" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.href }}</span>
        </template>
      </el-table-column>
      <el-table-column label="网站描述" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="openDialog(0, scope.row._id)">通过</el-button>
          <el-button size="mini" type="danger" @click="openDialog(1, scope.row._id)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    async getData() {
      const res = await this.$api.getAuditList();
      this.tableData = res.data.data;
    },
    openDialog(index, id) {
      const that = this;
      if (index) {
        // 拒绝
        this.$confirm("确认拒绝这个提交？")
          .then(_ => {
            this.$message('删除成功');
            this.delNav(id)
            this.getData()
          })
          .catch(_ => {});
      } else {
        const filterData = this.tableData.filter(item => item._id == id)[0];
        debugger
        const {
          classify,
          name, href, desc, logo
        } = filterData;
        const data = {
          classify: classify,
          icon: "el-icon-edit",
          sites: {
            name: name,
            href: href,
            desc: desc,
            logo: logo
          }
        };
        this.$confirm("确认添加到首页？")
          .then(_ => {
            this.$message('添加成功');
            this.addNav(data);
            this.getData()
          })
          .catch(_ => {});
      }
    },
    async delNav(id) {
      const res = await this.$api.delNav({ id: id });
    },
    async addNav(data) {
      const res = await this.$api.addNav(data);
    },
    formatTime(time) {
      return (
        new Date(time).toLocaleDateString() +
        new Date(time).toLocaleTimeString()
      );
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.admin {
  margin: 30px;

  &-header {
    margin-bottom: 50px;
  }
}
.el-table {
  width: auto;
}
</style>



