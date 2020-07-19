<template>
  <adminLayout>
    <div>
      <el-table :data="tableData" v-loading="loading">
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
            <el-button size="mini" @click="handleEdit(scope.row)">
              修改
            </el-button>
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
      <el-pagination
        layout="pager"
        :total="total"
        @current-change="handlePageNumber"
      >
      </el-pagination>

      <AddNavPopup
        :show.sync="show"
        :item="editItem"
        type="update"
        @submit="getData"
      />
    </div>
  </adminLayout>
</template>

<script>
import AddNavPopup from "@/components/AddNavPopup";
import adminLayout from "~/layouts/admin-layout";
import api from "~/api";

export default {
  components: {
    AddNavPopup,
    adminLayout
  },
  data() {
    return {
      loading: false,
      pageNumber: 1,
      show: false,
      editItem: {},
      active: 0,
      tableData: [],
      total: 0,
      activeName: "two"
    };
  },
  methods: {
    async getData() {
      this.loading = true;
      const res = await this.$api.getHome({
        pageNumber: this.pageNumber
      });
      this.tableData = res.data;
      this.total = res.total;
      this.loading = false;
    },
    handlePageNumber(num) {
      this.pageNumber = num
      this.getData()
    },
    handleEdit(item) {
      this.show = true;
      this.editItem = item;
    },
    async handleDelete(id) {
      const data = await this.$api.delNav(id);
      this.$message("删除成功");
      this.getData();
    }
  },
  async asyncData() {
    const { data, total } = await api.getHome();
    return {
      tableData: data,
      total
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: left;
  font-size: 14px;
  line-height: initial;
  margin: 20px 0;
}
</style>
