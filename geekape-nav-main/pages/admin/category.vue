<template>
  <admin-layout>
    <div class="category">
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
        v-loading="loading"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.name }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="handleEdit(data)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="handleDelete(data)"
            >
              删除
            </el-button>
            <el-button
              type="text"
              size="mini"
              v-if="data.categoryId"
              @click="handleNodeClick(data)"
            >
              管理分类
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
          <el-form-item label="选择icon">
            <el-select v-model="form.icon">
              <el-option
                :value="item"
                v-for="item in iconList"
                :key="item"
              >
                <i :class="item"></i>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </admin-layout>
</template>

<script>
import adminLayout from "~/layouts/admin-layout";
import axios from "~/plugins/axios";
export default {
  components: {
    adminLayout
  },
  data() {
    return {
      loading: false,
      iconList: [
        'iconfont icon-qianduan',
        'iconfont icon-bd_jiaocheng',
        'iconfont icon-ziyuan',
        'iconfont icon-chanpin',
        'iconfont icon-gongju',
        'iconfont icon-yunying',
        'iconfont icon-sheji',
      ],
      data: [],
      dialogVisible: false,
      editId: "",
      form: {
        name: "",
        categoryId: "",
        icon: ""
      }
    };
  },
  methods: {
    async handleAdd(id) {
      if (this.editId) {
        await this.$api.editCategory({
          id: this.editId,
          ...this.form
        });
      } else {
        await this.$api.addCategory(this.form);
      }

      this.dialogVisible = false;
      this.$message.info(this.editId ? "编辑成功" : "新增成功");
      this.resetForm()
      this.getData();
    },
    async handleEdit(data) {
      this.dialogVisible = true;
      this.form.name = data.name;
      this.form.categoryId = data.categoryId;
      this.form.icon = data.icon;
      this.editId = data._id;
    },
    async handleDelete(row) {
      await this.$api.delCategory(row._id);
      this.resetForm()
      this.getData();
    },
    async getData() {
      this.loading = true;
      const res = await this.$api.getCategoryList();
      let resData = res.data;
      this.loading = false;
      this.data = resData;
    },
    resetForm() {
      this.editId = ''
      this.form.name = ''
      this.form.categoryId = ''
    },
    handleNodeClick(e) {

      // 二级分类才触发
      this.$router.replace(`/admin/list?id=${e._id}`)
    }
  },
  async asyncData() {
    const res = await axios.get('/api/category/list')
    return {
      data: res.data
    }
  }
};
</script>

<style lang="scss" scoped>
.el-tree {
  margin-top: 30px;
}

.category {
  .el-dialog {
    text-align: left;
  }
  .el-button+.el-button {
    margin: 0;
  }
}
</style>
