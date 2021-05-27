<template>
  <admin-layout>
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
      </el-row>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column label="提交日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">
              {{ $dayjs(scope.row.createAt).format("YYYY-MM-DD HH:ss") }}
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
              v-if="scope.row.status == 1"
            >
              通过
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="openDialog(1, scope.row._id, scope.$index)"
              v-if="scope.row.status == 1"
            >
              拒绝
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <el-pagination
      layout="pager"
      :total="total"
      @current-change="getData({pageNumber: $event})"
    >
    </el-pagination>
  </admin-layout>
</template>

<script>
import adminLayout from "~/layouts/admin-layout";
import api from "~/api";

export default {
  components: {
    adminLayout
  },
  data() {
    return {
      loading: false,
      status: [
        { value: 1, label: "审核中" },
        { value: 2, label: "已拒绝" }
      ],
      selectedStatus: 1,
      isNavPopup: false,
      editItem: {},
      active: 0,
      total: 0,
      tableData: [],
      tableNavData: [],
      activeName: "two"
    };
  },
  methods: {
    async getData(data = {}) {
      this.loading = true;
      const res = await this.$api.getNavList(data);
      this.tableData = res.data;
      this.total = res.pageNumber;
      this.loading = false;
    },
    // 拒绝－直接删除提交
    async delAuditNav(id) {
      const res = await this.$api.editNav({ id, status: 2 });
    },
    // 新增－展示到前台
    async addNav(id) {
      const res = await this.$api.editNav({ id, status: 0 });
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
        this.$confirm("确认添加到首页？")
          .then(_ => {
            this.$message("添加成功");
            this.addNav(id);
            this.tableData.splice(index, 1);
          })
          .catch(_ => {});
      }
    },
    clear() {
      this.$confirm("确认清空审核列表？").then(res => {
        this.$api.fastRejectAudit();
        this.getData();
      });
    }
  },
  watch: {
    selectedStatus(val) {
      this.getData({status: val});
    }
  },
  async asyncData() {
    const { data, pageNumber } = await api.getNavList({status: 1})
    return {
      tableData: data,
      total: pageNumber
    }
  }
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 20px;
}
</style>
