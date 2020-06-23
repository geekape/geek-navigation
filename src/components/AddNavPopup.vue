<template>
  <div class="add-nav-warp">
    <!-- 添加网站popup -->
    <el-dialog
      title="添加网站"
      :visible.sync="show"
      width="320"
      @close="$emit('update:show', false)"
    >
      <el-form ref="ruleForm" label-width="100px" :model="form" :rules="rules">
        <el-form-item label="网站链接" prop="url">
          <el-input placeholder="http://www.baidu.com/" v-model="form.url" />
        </el-form-item>

        <el-form-item label="网站分类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择">
            <el-option-group
              v-for="group in categorys"
              :key="group._id"
              :label="group.name"
            >
              <el-option
                v-for="item in group.children"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addNav('ruleForm')">
            立即创建
          </el-button>
          <el-button @click="form = {}">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // 分类列表
    data: Array,
    //popup类型：0为添加网站，1为修改网站
    type: {
      type: Number,
      default: 0,
    },
    show: {
      type: Boolean,
      default: false,
    },
    editItem: Object,
  },
  data() {
    return {
      categorys: [],
      form: {
        url: '',
        categoryId: '',
      },
      rules: {
        url: [{ required: true, message: '请输入url', trigger: 'blur' }],
        categoryId: [
          { required: true, message: '请选择分类', trigger: 'change' },
        ],
      },
      isDiyClassify: false,
    }
  },
  methods: {
    async getCategorys() {
      const { data } = await this.$api.getCategoryList()
      this.categorys = data.data
    },
    async addNav(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.addAudit(this.form)
          this.$message('提交成功，后台审核通过后才会显示')
          this.$emit('update:show', false)
        } else {
          console.log('error submit!!')
          return false
        }
      })

      
    },
  },
  watch: {
    form(val) {
      console.log('this.form', val)
    },
    dialogFormVisible() {
      if (!this.dialogFormVisible) {
        this.isDiyClassify = false
      }
    },
  },
  created() {
    this.getCategorys()
  },
}
</script>

<style lang="scss" scoped>
.add-classify-btn {
  color: $color-blue;
  cursor: pointer;
  max-width: 200px;
}
.el-icon-folder-add {
  margin-right: 5px;
}

.el-dialog {
  min-width: 320px;
}
</style>
