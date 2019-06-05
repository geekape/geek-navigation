<template>
  <div class="add-nav-warp">
    <!-- 添加网站popup -->
    <el-dialog :title="type ? '修改网站': '添加网站'" :visible.sync="show" width="320">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="网站名称" prop="name">
          <el-input placeholder="网站名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="网站分类" prop="classify">
          <el-select v-if="!isDiyClassify" v-model="form.classify" placeholder="请选择网站分类">
            <el-option
              :label="classfiys.classify"
              :value="classfiys.classify"
              v-for="classfiys in data"
              :key="classfiys._id"
            ></el-option>
          </el-select>
          <el-input v-else v-model="form.classify"></el-input>
          <div class="add-classify-btn" @click="isDiyClassify=true" v-if="!isDiyClassify && !type">
            <i class="el-icon-folder-add"></i>自定义分类
          </div>
        </el-form-item>
        <el-form-item label="网站链接" prop="href">
          <el-input　placeholder="http://www.baidu.com/" v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="网站LOGO" prop="logo">
          <el-input placeholder="默认使用[http://www.baidu.com/favicon.icon]格式" v-model="form.logo"></el-input>
        </el-form-item>
        <el-form-item label="网站描述" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
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
      form: {
        classify: "",
        icon: "el-icon-edit",
        name: "",
        href: "",
        desc: "",
        logo: ""
      },
      rules: {
        classify: [
          {
            required: true,
            message: "请选择网站分类",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请填写网站名称",
            trigger: "change"
          }
        ],
        href: [
          {
            required: true,
            message: "请填写网站链接",
            trigger: "change"
          }
        ]
      },
      isDiyClassify: false
    };
  },
  methods: {
    async addNav(data) {
      if (!this.type) {
        // 添加导航到审核
        const res = await this.$api.addAudit(data);
      }　else {
        // 编辑导航
        let {_id} = this.editItem
        let data = {
          id: _id,
          classify: this.form.classify,
          sites: {
            name: this.form.name,
            logo: this.form.logo,
            desc: this.form.desc,
            href: this.form.href
          } 
        }
        const res = await this.$api.editNav(data);
        this.$message('修改成功');
        this.$emit('update:show', false)
      }
    },
    goTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.time = new Date().getTime();
          this.$message("提交成功，后台审核通过后才会显示");
          this.dialogFormVisible = false;
          this.addNav(this.form);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  watch: {
		dialogFormVisible() {
			if (!this.dialogFormVisible) {
				this.isDiyClassify = false
			}
    },
    show () {
      this.form.name= this.editItem.name
      this.form.href= this.editItem.href
      this.form.desc= this.editItem.desc
      this.form.logo= this.editItem.logo
      this.form.classify= this.editItem.classify
    }
	}
};
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

