<template>
  <section class="login">
        <el-card class="box-card">
          <h2 class="g-text-c">登录后台</h2>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
              <el-input v-model="form.user"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.pwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="medium" type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: "",
        pwd: ""
      }
    };
  },
  methods: {
  
    async onSubmit(e) {
      const {user, pwd} = this.form
      let data = await this.$api.login(user, pwd)
      data = data.data
      if (data.status == 200) {
        this.$storage.set('TOKEN', data.token)
        this.$router.replace('/admin')
      } else {
        this.$message({
          message: data.msg,
          type: 'error'
        });
      }
    }
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



