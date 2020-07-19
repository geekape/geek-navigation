<template>
  <section class="login">
    <el-card class="box-card">
      <h2 class="g-text-c">登录后台</h2>
      <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" size="medium" type="primary" @click="onSubmit('ruleForm')">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
        ],
      },
    }
  },
  methods: {
    async onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true
          let data = await this.$api.login(this.form)
          if (data.token) {
            this.$storage.set('TOKEN', data.token)
            this.$router.replace('/admin')
          } else {
            this.$message({
              message: data.msg,
              type: 'error',
            })
          }
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  created() {
    this.$notify({
      title: '登录提示',
      type: 'info',
      message: '默认首次登录的账号密码为管理员身份',
      duration: 3000
    });
  }
}
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
