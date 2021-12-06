<template>
  <div class="self-information">
    <el-divider content-position="right">个人信息</el-divider>

    <div class="self-info">
      <el-descriptions class="myself" title="我的信息">
        <el-descriptions-item label="用户名">
          {{ selfInfo.account }}
        </el-descriptions-item>
        <el-descriptions-item label="密码">*******</el-descriptions-item>
        <el-descriptions-item label="姓名 ">
          <span v-if="selfInfo.name"> {{ selfInfo.name || "未实名" }} </span>
          <el-input
            placeholder="请输入姓名"
            clearable
            v-model="authInfo.name"
            v-if="auth && showControl"
          />
        </el-descriptions-item>
        <el-descriptions-item label="账号状态">
          <el-tag size="small">正常</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="身份证号">
          <span v-if="selfInfo.iid"> {{ selfInfo.iid || "未实名" }} </span>
          <el-input
            placeholder="请输入身份证号"
            clearable
            v-model="authInfo.iid"
            v-if="auth && showControl"
          />
        </el-descriptions-item>
        <el-descriptions-item label="手机 ">
          <span v-if="selfInfo.phone"> {{ selfInfo.phone || "未实名" }} </span>
          <el-input
            placeholder="请输入手机号"
            clearable
            v-model="authInfo.phone"
            v-if="auth && showControl"
          />
          <div class="identiti-code" v-if="auth && showControl">
            <el-input placeholder="验证码" v-model="identityCode1" />
            <el-button @click="getIdentityCode">验证码</el-button>
          </div>
        </el-descriptions-item>

        <el-descriptions-item label="商户编号">{{
          selfInfo.sid
        }}</el-descriptions-item>
      </el-descriptions>

      <div class="btns">
        <el-button :disabled="auth" @click="handleAuth">实名认证</el-button>
        <el-button type="danger" @click="handleDelete">注销账号</el-button>

        <span v-if="auth && showControl">
          <el-button type="primary" :disabled="!auth" @click="checkAuthInfo"
            >提交信息</el-button
          >
        </span>
      </div>
    </div>

    <el-divider content-position="right">店铺信息</el-divider>
    <div class="shop-info">
      <el-descriptions
        class="myshop"
        title="店铺概览"
        v-if="shopInfo"
        :column="2"
      >
        <el-descriptions-item label="店铺名">{{
          shopInfo.name
        }}</el-descriptions-item>
        <el-descriptions-item label="店铺状态">
          <el-tag size="small">正常</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="店铺地址">{{
          shopInfo.address
        }}</el-descriptions-item>
        <el-descriptions-item label="店铺头像">
          <el-image :src="shopInfo.shop_avatar_url"> </el-image>
        </el-descriptions-item>
        <el-descriptions-item label="营业执照">
          <el-image :src="shopInfo.business_permit_url"> </el-image>
        </el-descriptions-item>
        <el-descriptions-item label="健康证明">
          <el-image :src="shopInfo.health_certificate_url"> </el-image>
        </el-descriptions-item>
      </el-descriptions>

      <el-result
        icon="error"
        title="没有店铺"
        subTitle="点击下方按钮进行注册使用"
        v-else
      >
        <template slot="extra">
          <el-button type="primary" size="medium" @click="toCreateShop"
            >注册店铺</el-button
          >
        </template>
      </el-result>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "",
  created() {
    this.getSelfInfo();
  },
  data() {
    return {
      selfInfo: "",
      shopInfo: "",
      auth: "",
      showControl: "",
      identityCode1: "",
      identityCode2: "",
      authInfo: {
        name: "",
        iid: "",
        phone: "",
      },
    };
  },
  methods: {
    // 请求个人信息
    getSelfInfo() {
      this.$api.userApis.getSelfInfo().then((res) => {
        this.selfInfo = res.data.selfInfo;
        this.shopInfo = res.data.shopInfo.length ? res.data.shopInfo[0] : "";
        // 判断是否实名
        if (!this.selfInfo.iid && !this.selfInfo.phone && !this.selfInfo.name) {
          this.auth = false;
        } else {
          this.auth = true;
          this.showControl = false;
        }
      });
    },
    // 跳转注册店铺页面
    toCreateShop() {
      this.$router.push({ path: "/main/shop/register" });
      // 设置默认活跃导航中为注册店铺
      this.setActive("1002");
    },
    // 实名认证状态
    handleAuth() {
      this.auth = !this.auth;
      this.showControl = !this.showControl;
    },
    // 获取验证码
    getIdentityCode() {
      if (!parseInt(this.authInfo.phone)) {
        this.$message({
          type: "error",
          showClose: true,
          message: "手机号格式不正确",
        });
        return;
      }
      // 这里可以使用手机解码api替代
      const len = 4;
      let chars = "0123456789";
      let code = "";
      for (let i = 0; i < len; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      this.identityCode2 = code;
      this.$message({
        type: "success",
        message: "您的验证码为: " + code,
      });
    },
    // 对要实名的数据进行简单校验
    checkAuthInfo() {
      // 1. 是否填写完整
      if (!this.authInfo.name || !this.authInfo.iid || !this.authInfo.phone) {
        this.$message({
          type: "error",
          showClose: true,
          message: "请填写完整后再进行提交!",
        });
        return;
      }
      // 2.类型是否正确
      if (!parseInt(this.authInfo.iid)) {
        this.$message({
          type: "error",
          showClose: true,
          message: "身份证号格式不正确",
        });
        return;
      }
      // 验证码是否一致
      if (this.identityCode1 !== this.identityCode2) {
        this.$message({
          type: "error",
          showClose: true,
          message: "验证码错误!",
        });
        return;
      }
      this.submit();
    },
    // 弹窗提示是否注销
    handleDelete() {
      this.$messageBox
        .confirm("注销账号会将店铺一同删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.deleteAccount();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 注销
    deleteAccount() {
      this.$api.userApis.deleteAccount().then((res) => {
        if (res.code === 200) {
          localStorage.clear();
          location.reload();
          this.$message({
            type: "success",
            message: res.message,
          });
          this.$store.global.commit("setActive", "1000");
        }
      });
    },
    // 提交实名请求
    submit() {
      // 更新数据库
      this.$api.userApis.updateAuthInfo({ data: this.authInfo }).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message,
          });
          setTimeout(() => {
            location.reload();
          }, 500);
        }
      });
    },

    ...mapMutations(["setActive"]),
  },
};
</script>

<style scoped lang="scss">
.btns {
  display: flex;
  justify-content: space-between;
}
.el-input {
  width: auto;
}
.identiti-code {
  margin-top: 10px;
  display: flex;

  .el-input {
    width: 39%;
  }
  .el-button {
    margin-left: 10px;
  }
}
</style>