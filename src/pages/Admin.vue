<template>
  <section class="admin">
    <header class="admin-header">
      <h2>极客猿梦导航后台</h2>
      <el-button type="primary" size="mini" class="go-home"　@click="$router.push('/')">返回首页</el-button>
    </header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户提交" name="one">
        <el-table :data="tableData">
          <el-table-column label="提交日期" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ formatTime(scope.row.time) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="网站名称" width="180" prop="name"></el-table-column>
          <el-table-column label="网站分类" width="180" prop="classify"></el-table-column>
          <el-table-column label="网站链接" width="180" prop="href"></el-table-column>
          <el-table-column label="网站描述" width="180" prop="desc"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="openDialog(0, scope.row._id, scope.$index)">通过</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="openDialog(1, scope.row._id, scope.$index)"
              >拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="所有导航" name="two">
        <section v-for="(item,index) in tableNavData" :key="item._id">
          <h3>{{item.classify}}</h3>
          <el-table :data="item.sites">
            <el-table-column label="网站名字" width="180" prop="name"></el-table-column>
            <el-table-column label="网站链接" width="180" prop="href"></el-table-column>
            <el-table-column label="网站描述" width="180" prop="desc"></el-table-column>Î
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, item._id, scope.row, index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </section>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      tableNavData: [],
      tableData1: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],

      activeName: "two"
    };
  },
  methods: {
    async getData() {
      const res = await this.$api.getAuditList();
      this.tableData = res.data.data;
    },
    openDialog(type, id, index) {
      const that = this;
      if (type) {
        // 拒绝
        this.$confirm("确认拒绝这个提交？")
          .then(_ => {
            this.$message("删除成功");
            this.delAuditNav(id);
            this.tableData.splice(index, 1);
          })
          .catch(_ => {});
      } else {
        const filterData = this.tableData.filter(item => item._id == id)[0];
        const { classify, name, href, desc, logo, _id } = filterData;
        const data = {
          id: _id,
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
            this.$message("添加成功");
            this.addNav(data);
            this.tableData.splice(index, 1);
          })
          .catch(_ => {});
      }
    },
    // 拒绝－直接删除提交
    async delAuditNav(id) {
      const res = await this.$api.delAuditNav({ id: id });
    },
    // 新增－展示到前台
    async addNav(data) {
      const res = await this.$api.addNav(data);
    },
    // 所有导航
    async getAllNav() {
      const res = await this.$api.getHome();
      this.tableNavData = res.data;
    },
    // 监听删除导航
    async handleDelete(index, id, item, tableNavDataIndex) {
      const name = item.name
      this.tableNavData[tableNavDataIndex].sites.splice(index, 1)
      this.$message("删除成功");
      const data = await this.$api.delNav(id, name)
      
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
    this.getAllNav();
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



