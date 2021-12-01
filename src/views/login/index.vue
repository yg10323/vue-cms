<template>
  <div class="login-register">
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

  &-title {
    position: relative;
    text-align: center;
    font-weight: 700;
    font-size: 30px;
    margin-bottom: 40px;
  }
}
</style>