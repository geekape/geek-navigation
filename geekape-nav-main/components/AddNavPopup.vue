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
          <el-input placeholder="http://www.baidu.com/" v-model="form.href"  :disabled="type === 'update'" @blur="getNavInfo" />
          <span style="color: red">输入链接自动爬取信息</span>
        </el-form-item>

        <el-form-item label="网站分类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择" filterable>
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
        <el-form-item label="网站名称" prop="name">
          <el-input placeholder="输入网站名称" v-model="form.name" />
        </el-form-item>
        <el-form-item label="网站logo" prop="name">
          <el-input placeholder="输入网站logo" v-model="form.logo" />
          <img style="max-width: 30px;" :src="form.logo" />
        </el-form-item>
        <el-form-item label="网站描述" prop="desc">
          <el-input type="textarea" placeholder="输入网站描述" v-model="form.desc" />
        </el-form-item>
        <el-form-item label="作者名称" prop="authorName">
          <el-input placeholder="填写你推广的名称" v-model="form.authorName" />
        </el-form-item>
        <el-form-item label="作者网站" prop="authorUrl">
          <el-input placeholder="填写你要推广的链接" v-model="form.authorUrl" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="addNav('ruleForm')">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "../plugins/axios";
import {API_NAV, API_NAV_RANDOM, API_NAV_REPTILE} from "../api";

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    type: {
      validator: function(value = 'create') {
        // 这个值必须匹配下列字符串中的一个
        return ['create', 'update'].indexOf(value) !== -1
      },
    },
    item: Object,
  },
  data() {
    return {
      loading: false,
      categorys: [],
      form: {
        href: '',
        categoryId: '',
        name: '',
        logo: '',
        desc: '',
        authorName: '',
        authorUrl: ''
      },
      rules: {
        href: [
          { required: true, message: '请输入url', trigger: 'blur' },
          {
            pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
            message: '请输入正确的url',
          },
        ],
        categoryId: [
          { required: true, message: '请选择分类', trigger: 'blur' },
        ],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' },],
        desc: [{ required: true, message: '请输入描述', trigger: 'blur' },],
        logo: [{ required: true, message: '请输入logo', trigger: 'blur' },],
        authorUrl: [
          {
            pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
            message: '请输入正确的url',
            trigger: 'change'
          },
        ],
        authorName: [
          {
            pattern: /^[\u4e00-\u9fa5]{2,6}$/,
            message: '作者名称在2个字到6个字以内',
            trigger: 'change'
          },
        ],
      },
      isMoreForm: false,
    }
  },
  methods: {
    async getCategorys() {
      const { data } = await this.$api.getCategoryList()
      this.categorys = data
    },
    async addNav(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true
          // 判断编辑还是更新
          if (this.type === 'update') {
            const id = this.item._id
            const res = await this.$api.editNav({
              id,
              ...this.form
            })
          } else {
            const res = await this.$api.addNav(this.form)
            if (res.code === 0) {
              this.$message.error(`${res.msg}`)
            } else {
              this.$message(`感谢您的提交，请等待后台审核通过！`)
            }
          }
          this.loading = false
          this.$emit('update:show', false)
          this.$emit('submit')
        } else {
          return false
        }
      })
    },
    async getNavInfo() {
      const { href: url } = this.form
      if (!url) return
      const { data } = await axios.get(API_NAV_REPTILE + `?url=${url}`)

      this.form.logo = `https://www.google.com/s2/favicons?domain=${url}`
      this.form.name = data?.name
      this.form.desc = data?.desc
    }
  },
  created() {
    this.getCategorys()
  },
}
</script>

<style lang="scss" scoped>

.el-icon-folder-add {
  margin-right: 5px;
}

.add-nav-warp {
  /deep/ .el-dialog {
    width: 95%;
    max-width:500px;
  }
  .el-dialog__body {
    text-align: left;
  }

}
</style>
