<template>
  <div class="login-register">
    <div class="login-register-logo">
      <img class="img" src="@/assets/images/logo.svg" alt="logo" />
    </div>
    <div class="login-register-title">外卖猫-后台管理系统</div>
    <el-tabs type="border-card" :stretch="true">
      <el-tab-pane>
        <span slot="label"><i class="iconfont icon-denglu"></i></span>
        <login />
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="iconfont icon-zhuce"></i></span>
        <register />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import login from "./web/login.vue";
import register from "./web/register.vue";
export default {
  name: "",
  components: { login, register },
  created() {
    this.$notify({
      type: "warning",
      title: "提示",
      message: `服务器资源有限, 已将socket服务关闭, 扫码登录无法使用,
        注册的账号为卖家, 如需添加管理员账号,请登录账号: super, 密码: super 或其他管理员账号`,
      duration: 1000 * 30,
    });
  },
};
</script>

<style scoped lang="scss">
.iconfont {
  font-size: 20px;
}

.login-register {
  width: 450px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  &-logo {
    // top: 50px;
    text-align: center;
    margin-bottom: 10px;
    .img {
      height: 70px;
    }
  }

  &-title {
    position: relative;
    text-align: center;
    font-weight: 700;
    font-size: 30px;
    margin-bottom: 40px;
  }
}
</style>