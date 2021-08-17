<template>
  <div class="container">
    <el-card>
        <el-form ref="ruleForm" label-width="100px" :model="form" :rules="rules"  v-loading="formLoading">

          <el-form-item label="网站链接" prop="href">
            <el-input placeholder="http://www.baidu.com/" v-model="form.href"  :disabled="type === 'update'" @blur="getNavInfo" />
            <span style="color: red">输入链接自动爬取信息</span>
          </el-form-item>

          <el-form-item label="网站标签" prop="tags">
            <el-select
              v-model="form.tags"
              multiple
              :multiple-limit="5"
              filterable
              allow-create
              default-first-option
              placeholder="输入网站标签，最多5个">
              <el-option
                v-for="item in tags"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="网站名称" prop="name">
            <el-input placeholder="输入网站名称" v-model="form.name" />
          </el-form-item>

          <el-form-item label="网站logo" prop="logo">
            <el-input placeholder="输入网站logo" v-model="form.logo" />
            <img style="max-width: 30px;" :src="form.logo" />
          </el-form-item>
          <el-form-item label="网站描述" prop="desc">
            <el-input placeholder="一句话网站描述，15个字以内" v-model="form.desc" />
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
          <el-form-item label="推荐人名称" prop="authorName">
            <el-input placeholder="填写你推广的名称" v-model="form.authorName" />
          </el-form-item>
          <el-form-item label="推荐人网站" prop="authorUrl">
            <el-input placeholder="填写你要推广的链接" v-model="form.authorUrl" />
          </el-form-item>
          <el-form-item label="网站详情" prop="detail">
            <el-input type="textarea" placeholder="输入网站详情" v-model="form.detail" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="addNav('ruleForm')">
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
import layoutMixin from "../mixins/layoutMixin";
import axios from "../plugins/axios";
import {API_NAV, API_NAV_REPTILE, API_TAG_LIST} from "../api";

export default {
  name: "recommend",
  data() {
    return {
      loading: false,
      formLoading: false,
      categorys: [],
      tags: [],
      form: {
        href: '',
        categoryId: '',
        name: '',
        tags: [],
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
        tags: [
          { required: true, message: '请输入标签', trigger: 'blur' },
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
    async getTags() {
      const res = await axios.get(API_TAG_LIST)
      if (res.code === 1) {
        let data = res.data?.data
        data = data.map(item=> {
          item.value = item.name
          item.label = item.name
          return item
        })
        this.tags = res.data?.data
      }
    },
    async getCategorys() {
      const { data } = await this.$api.getCategoryList()
      this.categorys = data
    },
    async addNav(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true
          // 判断编辑还是更新

          const res = await axios.post(API_NAV, this.form)
          if (res.code === 0) {
            this.$message.error(`${res.msg}`)
          } else {
            this.$message(`感谢您的提交，请等待后台审核通过！`)
            this.$refs.ruleForm.resetFields()
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
      this.formLoading = true
      try {
        const { data } = await axios.get(API_NAV_REPTILE + `?url=${url}`)
        this.form.logo = `https://www.google.com/s2/favicons?domain=${url}`
        this.form.name = data?.name
        this.form.desc = data?.desc
      } catch (e) {
        this.$message.error('请求超时')
        this.$emit('update:show', false)
      }
      this.formLoading = false
    }
  },
  created() {
    this.getTags()
    this.getCategorys()
  },
}
</script>

<style scoped>
.container {
  margin: 30px;
}
</style>
