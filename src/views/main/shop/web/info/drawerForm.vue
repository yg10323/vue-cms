<template>
  <div class="drawer-form">
    <el-button type="primary" size="small" @click="handleDrawer"
      >修改基本信息</el-button
    >
    <el-drawer
      title="店铺信息修改"
      :visible.sync="drawer"
      :before-close="handleClose"
    >
      <!-- 表单信息 -->
      <el-form
        :model="shopForm"
        ref="shopForm"
        label-width="100px"
        class="drawer-shopInfo"
      >
        <!-- 店铺名 -->
        <el-form-item label="店铺名称" prop="name">
          <el-input
            class="input"
            placeholder="新的店铺名称"
            v-model="shopForm.name"
          ></el-input>
        </el-form-item>

        <!-- 店铺地址 -->
        <el-form-item label="店铺地址" prop="address">
          <el-input
            class="input"
            placeholder="新的店铺地址"
            v-model="shopForm.address"
          ></el-input>
        </el-form-item>

        <!-- 店铺分类 -->
        <el-form-item label="店铺分类" prop="classify">
          <el-cascader
            v-model="shopForm.classify"
            :options="options"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>

        <!-- 营业时间 -->
        <el-form-item class="timer" label="营业时间">
          <el-col :span="9">
            <el-form-item prop="start_time">
              <el-time-select
                placeholder="起始时间"
                v-model="shopForm.start_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '24:00',
                }"
              >
              </el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item prop="end_time">
              <el-time-select
                placeholder="结束时间"
                v-model="shopForm.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '24:00',
                }"
              >
              </el-time-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <!-- 商家服务 -->
        <el-form-item label="商家服务" prop="service">
          <el-checkbox-group v-model="shopForm.service">
            <el-checkbox label="猫公益" name="type"></el-checkbox>
            <el-checkbox label="准时宝" name="type"></el-checkbox>
            <el-checkbox label="放心吃" name="type"></el-checkbox>
            <el-checkbox label="热情掌柜" name="type"></el-checkbox>
            <el-checkbox label="食材公示" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 配送服务 -->
        <el-form-item label="配送服务" prop="delivery">
          <el-radio-group v-model="shopForm.delivery">
            <el-radio label="商家配送"></el-radio>
            <el-radio label="外卖猫快送"></el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 店铺公告 -->
        <el-form-item label="店铺公告" prop="notice">
          <el-input
            class="input"
            type="textarea"
            :rows="3"
            placeholder="这里发布公告哦"
            v-model="shopForm.notice"
          ></el-input>
        </el-form-item>

        <!-- 店铺头像图片 -->
        <el-form-item label="店铺头像" prop="shop_avatar">
          <el-upload
            action="#"
            ref="avatar"
            list-type="picture-card"
            :auto-upload="false"
            :http-request="handleUpload"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <!-- 提交 -->
        <el-form-item class="submit-wrap">
          <el-button type="primary" @click="beforeSubmit">提交</el-button>
          <el-button @click="resetForm('shopForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["usable"],
  created() {
    this.fileFormData = new FormData(); // 用于收集图片信息, 上传使用
    this.options = JSON.parse(sessionStorage.getItem("options"));
  },
  data() {
    return {
      drawer: false,
      options: "",
      fileFormData: "",
      shopForm: {
        seller_id: "",
        name: "",
        address: "",
        classify: { op_id: "", ch_id: "" },
        start_time: "",
        end_time: "",
        service: [],
        delivery: "",
        activities: [{ value: "" }],
        notice: "",
      },
    };
  },
  methods: {
    // 控制抽屉显示
    handleDrawer() {
      if (this.usable !== 1) {
        this.$notify.error({
          title: "异常",
          message: "检测到店铺已被封禁, 请联系管理员进行处理",
        });
        return;
      }
      this.drawer = true;
    },
    // 抽屉关闭前
    handleClose(done) {
      this.$messageBox
        .confirm("不离开当前页面已填写的信息都不会清空哦, 确认关闭吗？", "提示")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 级联菜单点击后
    handleChange(value) {
      this.shopForm.classify.op_id = value[0];
      this.shopForm.classify.ch_id = value[1];
    },
    // 往formdata添加图片信息
    handleUpload(file) {
      this.fileFormData.append("file", file.file);
    },
    // 提交之前的数据处理
    beforeSubmit() {
      const data = this.$utils.removeEmpty(this.shopForm); //shopFrom
      const imgForm = this.$refs.avatar.uploadFiles[0]; //fileFormData
      if (JSON.stringify(data) === "{}" && !imgForm) {
        this.$notify.error({
          title: "空数据大抵是无法提交的",
          message: "我仔细检查了提交的两条数据, 一条是空的, 另一条也是空的",
        });
      } else {
        this.$refs.avatar.submit();
        this.fileFormData.append("data", JSON.stringify(data));
        this.submit();
      }
    },
    // 提交数据
    submit() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      this.$api.shopApis
        .updateShopInfo({
          data: this.fileFormData,
          config,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$notify({
              title: "成功",
              message: res.message,
              type: "success",
            });
            setTimeout(() => location.reload(), 1000);
          }
        });
      // 重置表单
      this.fileFormData = new FormData();
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
.input {
  width: 80%;
}
.timer {
  .el-input {
    width: 120px;
  }
}
</style>