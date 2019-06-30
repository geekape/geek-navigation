<template>
  <div class="add-nav-warp">
    <!-- 添加网站popup -->
    <el-dialog
      :title="type ? '修改网站': '添加网站'"
      :visible.sync="show"
      width="320"
      @close="$emit('update:show', false)"
    >
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-form-item
          label="网站名称"
          prop="name"
        >
          <el-input
            placeholder="网站名称"
            v-model="name"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="网站分类"
          prop="classify"
        >
          <el-select
            v-if="!isDiyClassify"
            v-model="classify"
            placeholder="请选择网站分类"
          >
            <el-option
              :label="classfiys.classify"
              :value="classfiys.classify"
              v-for="classfiys in data"
              :key="classfiys._id"
            ></el-option>
          </el-select>
          <el-input
            v-else
            v-model="classify"
          ></el-input>
          <div
            class="add-classify-btn"
            @click="isDiyClassify=true"
            v-if="!isDiyClassify && !type"
          >
            <i class="el-icon-folder-add"></i>自定义分类
          </div>
        </el-form-item>
        <el-form-item
          label="网站链接"
          prop="href"
        >
          <el-input　placeholder="http://www.baidu.com/" v-model="href"></el-input>
        </el-form-item>
        <el-form-item
          label="网站LOGO"
          prop="logo"
        >
          <el-input
            placeholder="默认使用[http://www.baidu.com/favicon.icon]格式"
            v-model="logo"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="网站描述"
          prop="desc"
        >
          <el-input
            type="textarea"
            v-model="desc"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="addNav"
          >立即创建</el-button>
          <el-button @click="resetForm()">重置</el-button>
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
      default: 0
    },
    show: {
      type: Boolean,
      default: false
    },
    editItem: Object
  },
  data() {
    return {
      classify: '',
      icon: 'el-icon-edit',
      name: '',
      href: '',
      desc: '',
      logo: '',
      formReles: {
        name: '',
        href: '',
        classify: ''
      },
      isDiyClassify: false
    }
  },
  methods: {
    async addNav() {
      // 验证
      if (!this.name) {
        this.$message.error('网站名称不能为空')
        return
      }

      if (!this.classify) {
        this.$message.error('网站分类不能为空')
        return
      }

      if (!this.href) {
        this.$message.error('网站链接不能为空')
        return
      }

      let data = {
        classify: this.classify,
        name: this.name,
        href: this.href,
        desc: this.desc,
        logo: this.logo
      }

      if (!this.type) {
        // 添加导航到审核
        // 如果没logo就默认一个
        // 验证通过
        data.time = new Date().getTime()
        if (!data.logo) {
          data.logo = data.href + 'favicon.ico'
        }
        this.$message('提交成功，后台审核通过后才会显示')
        this.$emit('update:show', false)

        const res = await this.$api.addAudit(data)
      } else {
        // 编辑导航
        const { navId } = this.editItem
        const { classify, name, logo, desc, href, _id } = data
        this.$message('修改成功')
        this.$emit('update:show', false)
        const res = await this.$api.editNav({
          id: navId,
          classify: classify,
          sites: {
            name: name,
            logo: logo,
            desc: desc,
            href: href
          }
        })
        this.$emit('reloadData')
      }
    },

    resetForm() {
      this.classify = ''
      this.name = ''
      this.href = ''
      this.desc = ''
      this.logo = ''
    }
  },
  watch: {
    dialogFormVisible() {
      if (!this.dialogFormVisible) {
        this.isDiyClassify = false
      }
    },
    show() {
      if (this.type && this.show) {
        console.log('弹窗显示')
        // 修改网站
        this.name = this.editItem.name
        this.href = this.editItem.href
        this.desc = this.editItem.desc
        this.logo = this.editItem.logo
        this.classify = this.editItem.classify
      }
    }
  }
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

