<template>
  <section class="login">
        <el-card class="box-card">
    <el-row>
      <el-col :xs="10" :md="24">
          <h2 class="g-text-c">登录后台</h2>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
              <el-input v-model="form.user"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="medium" type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
          </el-form>
      </el-col>
    </el-row>
        </el-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: "",
        password: ""
      }
    };
  },
  methods: {
    pageInit() {
        this.$message({
          message: '管理员账号和密码都是admin,登录后请及时修改',
          type: 'warning',
          duration: 10000
        });
    }
  },
  created() {
    this.pageInit()
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
}

.g-text-c {
  text-align: center;
}

.el-form {
  margin-top: 30px;
}

.box-card {
  width: 400px;
}
</style>



