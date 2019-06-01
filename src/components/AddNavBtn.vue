<template>
  <div class="add-nav-warp">
    <div class="add-nav-btn" @click="dialogFormVisible=true">
      <el-tooltip class="item" effect="dark" content="添加网站" placement="left-start">
        <el-button>
          <i class="el-icon-plus"></i>
        </el-button>
      </el-tooltip>
    </div>
    <!-- 添加网站popup -->
    <el-dialog title="添加网站" :visible.sync="dialogFormVisible" width="320">
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
          <div class="add-classify-btn" @click="isDiyClassify=true" v-if="!isDiyClassify">
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
    data: Array
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
      dialogFormVisible: false,
      isDiyClassify: false
    };
  },
  methods: {
    async addNav(data) {
      const res = await this.$api.addAudit(data);
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
		}
	}
};
</script>

<style lang="scss" scoped>
.add-nav-btn {
  &,
  .el-button {
    border: 0;
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    position: fixed;
    background: #fff;
    right: 10px;
    bottom: 85px;
    z-index: 9999;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
}
[class^="el-icon-"] {
  font-size: 20px;
}

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

