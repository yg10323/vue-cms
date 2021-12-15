<template>
  <div class="register">
    <el-form
      :model="registerForm"
      status-icon
      :rules="rules"
      ref="registerForm"
      label-width="100px"
      class="demo-registerForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model.number="registerForm.account"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          show-password
          v-model="registerForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="registerForm.checkPass"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item class="buttons">
        <el-button
          type="primary"
          @click="submitForm('registerForm')"
          :disabled="disabled"
          >注册</el-button
        >
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkaccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else if (Number.isInteger(value)) {
        callback(new Error("不支持纯数字,请重新输入"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        account: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        account: [{ validator: checkaccount, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      disabled: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   发送网络请求
          this.$api.userApis
            .sellerRegister({
              data: {
                account: this.registerForm.account,
                password: this.registerForm.pass,
              },
            })
            .then((res) => {
              if (res.code === 200) {
                this.$message({
                  type: "success",
                  message: `${this.registerForm.account}注册成功, 请返回登录~`,
                  showClose: true,
                });
              } else {
                console.log("error_register");
              }
            });

          this.disabled = true;
          setTimeout(() => {
            this.disabled = false;
          }, 3000);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
.buttons {
  position: relative;
  top: 10px;
  left: 12%;
}
</style>