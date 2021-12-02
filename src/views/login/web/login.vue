<template>
  <div class="login">
    <div class="login-form" v-if="!showQrCode">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model.number="loginForm.account"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            show-password
            v-model="loginForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item class="login-form-buttons">
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            :disabled="disabled"
            >登录</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-qr-image" v-if="showQrCode">
      <img :src="qrCodeBase64" alt="" />
      <span>请使用外卖猫APP扫一扫</span>
    </div>
    <div class="login-bottom">
      <div class="login-bottom-retrieve" v-if="!showQrCode">忘记密码</div>
      <div class="login-bottom-qrcode">
        <i
          class="login-bottom-qrcode-icon iconfont icon-erweima1"
          @click="handleClick"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    var checkaccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        pass: "",
      },
      rules: {
        account: [{ validator: checkaccount, trigger: "blur" }],
        pass: [{ validator: validatepass, trigger: "blur" }],
      },
      disabled: false,
      loginType: "success",
      showQrCode: false,
      socket: "", //socket连接
      qrCodeBase64: "", //二维码base64字符串
      qrInfo: "", //二维码相关的信息: socket_id, qid(每个二维码的标识)
    };
  },
  created() {
    // 连接创建后立即请求二维码
    this.socket = this.$socket("getQrCode");
    this.setQrCode();
    this.qrOverTime();
    this.scanCodeWebToken();
  },
  methods: {
    // 判断登录成功与否
    loginStatus(res) {
      if (res.code === 200) {
        this.socket.close();
        // 将用户相关信息保存至vuex和localStorage
        this.setToken(res.token);
        this.setUserInfo(res.userInfo);
        // 请求菜单数据
        this.getMenu();
      } else {
        this.loginType = "error";
      }
      this.$message({
        type: this.loginType,
        message: res.message,
        showClose: true,
      });
      this.loginType = "success";
    },
    // 账号密码登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   发送网络请求
          this.$api.userApis
            .sellerLogin({
              data: {
                account: this.loginForm.account,
                password: this.loginForm.pass,
                longKeep: false,
              },
            })
            .then((res) => {
              // console.log(res);
              this.loginStatus(res);
            });

          this.disabled = true;
          setTimeout(() => {
            this.disabled = false;
          }, 3000);
        } else {
          console.log("error login!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 请求菜单数据
    getMenu() {
      this.$api.userApis.getSellerMenu().then((res) => {
        if (res.code === 200) {
          // 将菜单信息保存至vuex和localStorage
          this.setMenus(res.menus);
          // 跳转到首页
          this.$router.push("/main");
        }
      });
    },
    // 点击右下角二维码图标时
    handleClick() {
      this.showQrCode = !this.showQrCode;
    },
    // 监听服务端发来的二维码, 并渲染
    setQrCode() {
      this.socket.on("sendQrCode", (res) => {
        this.qrCodeBase64 = res.qr;
        this.qrInfo = res.qrInfo;
      });
    },
    // 监听二维码是否过期, 过期则立即请求新的
    qrOverTime() {
      this.socket.on("qrOverTime", (res) => {
        // console.log("二维码过期拉");
        this.socket.emit("getQrCode");
      });
    },
    // 监听是否通过扫码登录
    scanCodeWebToken() {
      this.socket.on("scanCodeWebToken", (res) => this.loginStatus(res));
    },
    ...mapMutations(["setToken", "setUserInfo", "setMenus"]),
  },
};
</script>

<style scoped lang="scss">
.login {
  &-form {
    &-buttons {
      position: relative;
      top: 10px;
      left: 12%;
    }
  }

  &-qr-image {
    img {
      position: relative;
      width: 230px;
      left: 50%;
      transform: translateX(-50%);
    }
    span {
      position: relative;
      margin-top: 20px;
      margin-left: -105px;
      user-select: none;
    }
  }

  &-bottom {
    &-retrieve {
      display: inline-block;
      font-size: 14px;
      color: #909399;
      cursor: pointer;

      &:hover {
        color: #409eff;
      }
    }

    &-qrcode {
      display: inline-block;

      &-icon {
        position: absolute;
        right: 5px;
        bottom: 5px;
        font-size: 30px;
        cursor: pointer;

        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>