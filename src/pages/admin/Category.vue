<template>
  <div>
    <el-row type="flex" justify="start">
      <el-button type="primary" @click="dialogVisible = true">
        添加分类
      </el-button>
    </el-row>
    <el-table :data="data" style="width: 100%;margin-top: 30px">
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column
        prop="createAt"
        label="创建时间"
        width="180"
      ></el-table-column>
      <el-table-column
      align="right">
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" class="demo-form-inline">
        <el-form-item label="分类名称" required>
          <el-input v-model="form.name" placeholder="分类名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      dialogVisible: false,
      form: {
        name: '',
      },
    }
  },
  methods: {
    async handleAdd() {
      await this.$api.addCategory(this.form)
      this.form.name = ''
      this.dialogVisible = false
      this.$message.error('添加成功')
      this.getData()
    },
    async handleEdit() {},
    async handleDelete(index, row) {
      await this.$api.delCategory(row._id)
      this.getData()
    },
    async getData() {
      const res = await this.$api.getCategoryList()
      this.data = res.data.data
    },
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped></style>
