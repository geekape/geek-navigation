<template>
  <div class='category'>
    <el-row type="flex" justify="start">
      <el-button type="primary" @click="dialogVisible = true">
        添加分类
      </el-button>
    </el-row>
    <el-tree
      :data="data"
      show-checkbox
      node-key="_id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
        <span>
          <el-button type="text" size="mini" @click="() => handleDelete(data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" class="demo-form-inline">
        <el-form-item label="分类名称" required>
          <el-input v-model="form.name" placeholder="分类名称"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-select v-model="form.categoryId" placeholder="">
            <el-option
              :label="item.name"
              :value="item._id"
              v-for="item in data"
              :key="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">保存</el-button>
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
      editId: '',
      
      form: {
        name: '',
        categoryId: '',
      },
    }
  },
  methods: {
    async handleAdd(id) {
      if (this.editId) {
        await this.$api.editCategory({
          id: this.editId,
          ...this.form,
        })
      } else {
        await this.$api.addCategory(this.form)
      }

      this.dialogVisible = false
      this.$message.error(this.editId ? '编辑成功' : '新增成功')
      this.form = {}
      this.editId = ''
      this.getData()
    },
    async handleEdit(index, row) {
      ;(this.dialogVisible = true), (this.form.name = row.name)
      this.editId = row._id
    },
    async handleDelete(row) {
      await this.$api.delCategory(row._id)
      this.form = {}
      this.getData()
    },
    async getData() {
      const res = await this.$api.getCategoryList()
      let resData = res.data

      // const sencondCategory = resData.filter(item=> item.categoryId)
      // resData = resData.map(item=> {
      //   item.children = sencondCategory.filter(cate=> cate.categoryId === item.categoryId)
      // })

      this.data = resData
    },
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
.el-tree {
  margin-top: 30px;
}

.category {
  .el-dialog {
    text-align: left;
  }
}
</style>
