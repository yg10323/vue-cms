<template>
  <div class="add-shop">
    <el-form
      :model="shopInfo"
      :rules="rules"
      ref="shopInfo"
      label-width="100px"
      class="shop-info"
    >
      <!-- 店铺名 -->
      <el-form-item label="店铺名称" prop="name">
        <el-input class="input" v-model="shopInfo.name"></el-input>
      </el-form-item>

      <!-- 店铺地址 -->
      <el-form-item label="店铺地址" prop="address">
        <el-input class="input" v-model="shopInfo.address"></el-input>
      </el-form-item>

      <!-- 店铺分类 -->
      <el-form-item label="店铺分类" prop="classify">
        <el-cascader
          v-model="shopInfo.classify"
          :options="options"
          @change="handleChange"
        >
        </el-cascader>
      </el-form-item>

      <!-- 营业时间 -->
      <el-form-item label="营业时间" required>
        <el-col :span="6">
          <el-form-item prop="start_time">
            <el-time-select
              placeholder="起始时间"
              v-model="shopInfo.start_time"
              :picker-options="{
                start: '06:00',
                step: '00:30',
                end: '24:00',
              }"
            >
            </el-time-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">—</el-col>
        <el-col :span="6">
          <el-form-item prop="end_time">
            <el-time-select
              placeholder="结束时间"
              v-model="shopInfo.end_time"
              :picker-options="{
                start: '06:00',
                step: '00:30',
                end: '24:00',
              }"
            >
            </el-time-select>
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- 青山计划 -->
      <el-form-item label="青山计划" prop="mountain_plan">
        <el-popover
          placement="top-start"
          title="关于青山计划"
          width="200"
          trigger="hover"
          content="青山计划从环保理念倡导、环保路径研究、科学闭环探索、环保公益推动四个方面推动外卖行业环保化进程。"
        >
          <i class="iconfont icon-wenhao" slot="reference"></i>
        </el-popover>
        <el-switch v-model="shopInfo.mountain_plan" disabled></el-switch>
      </el-form-item>

      <!-- 店铺头像图片 -->
      <el-form-item
        label="店铺头像"
        prop="shop_avatar"
        :required="status.shop_avatar"
      >
        <el-upload
          action="#"
          ref="avatar"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="appendAvatar"
          :on-change="appendAvatar"
          :auto-upload="false"
          :http-request="handleUpload"
          :multiple="true"
          :limit="1"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <!-- 营业执照图片 -->
      <el-form-item
        label="营业执照"
        prop="shop_business"
        :required="status.shop_business"
      >
        <el-upload
          action="#"
          ref="business"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="appendBusiness"
          :on-change="appendBusiness"
          :auto-upload="false"
          :http-request="handleUpload"
          :multiple="true"
          :limit="1"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!-- 健康证图片 -->
      <el-form-item
        label="健康证明"
        prop="shop_health"
        :required="status.shop_health"
      >
        <el-upload
          action="#"
          ref="health"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="appendHealth"
          :on-change="appendHealth"
          :auto-upload="false"
          :http-request="handleUpload"
          :multiple="true"
          :limit="1"
        >
          <i class="el-icon-plus"></i>
        </el-upload>

        <!-- 图片上传进度条 -->
        <el-progress class="progress" :percentage="percentage"></el-progress>
      </el-form-item>

      <!-- 商家服务 -->
      <el-form-item label="商家服务" prop="service">
        <el-checkbox-group v-model="shopInfo.service">
          <el-checkbox label="猫公益" name="type"></el-checkbox>
          <el-checkbox label="准时宝" name="type"></el-checkbox>
          <el-checkbox label="放心吃" name="type"></el-checkbox>
          <el-checkbox label="热情掌柜" name="type"></el-checkbox>
          <el-checkbox label="食材公示" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- 配送服务 -->
      <el-form-item label="配送服务" prop="delivery">
        <el-radio-group v-model="shopInfo.delivery">
          <el-radio label="商家配送"></el-radio>
          <el-radio label="外卖猫快送"></el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 动态增减活动 -->
      <el-form-item
        v-for="(activity, index) in shopInfo.activities"
        :label="'活动优惠' + (index + 1)"
        :key="activity.key"
        :prop="'activities.' + index + '.value'"
        :rules="{
          required: true,
          message: '活动内容不能为空',
          trigger: 'blur',
        }"
      >
        <el-input class="input" v-model="activity.value"></el-input>
        <el-button @click.prevent="removeActivity(activity)" type="danger"
          >删除</el-button
        >
      </el-form-item>

      <!-- 增加活动 -->
      <el-form-item label="新增活动">
        <el-button
          class="addActivity"
          @click="addActivity"
          type="warning"
          circle
        >
          <i class="iconfont icon-xinzeng1"></i>
        </el-button>
      </el-form-item>

      <!-- 提交 -->
      <el-form-item class="submit-wrap">
        <el-button
          type="primary"
          @click="beforeSubmit('shopInfo')"
          :disabled="!realName || shopExist || hasShop"
          >立即创建</el-button
        >
        <el-button @click="resetForm('shopInfo')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- dialog预览图片 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import config from "../../config/shop-config";
export default {
  name: "",
  created() {
    this.fileFormData = new FormData(); // 用于收集图片信息, 上传使用
    this.getRealName(); // 获取实名状态, 控制注册按钮是否可用
    this.getHasShop(); //获取是否已有店铺, 控制注册按钮是否可用
  },
  data() {
    return { ...config };
  },
  methods: {
    // 获取实名状态
    getRealName() {
      this.$api.userApis.getRealName().then((res) => {
        if (res.code !== 200) {
          this.$message({
            type: "error",
            message: res.message,
            showClose: true,
          });
        } else {
          this.realName = true;
          this.getClassify();
        }
      });
    },
    // 获取是否已有店铺
    getHasShop() {
      this.$api.shopApis.getHasShop().then((res) => {
        if (res.hasShop) {
          this.hasShop = !this.hasShop;
          this.$message({
            type: "error",
            message: "已有店铺, 不允许注册多个店铺!",
          });
        }
      });
    },
    // 判断店铺名是否已被注册
    judgeShopExist() {
      this.$api.shopApis
        .getShopExist({ data: { name: this.shopInfo.name } })
        .then((res) => {
          if (res.exist) {
            this.shopExist = !this.shopExist;
            this.$message({
              type: "error",
              message: "店铺名已被注册啦",
            });
          } else {
            this.$message({
              type: "success",
              message: "店铺名未被注册, 可以使用该名称",
            });
          }
        });
    },
    // 获取店铺分类
    getClassify() {
      this.$api.shopApis.getClassify().then((res) => {
        const options = this.$utils.setOptions(res);
        this.options = options;
        sessionStorage.setItem("options", JSON.stringify(this.options));
      });
    },
    // 级联菜单点击后
    handleChange(value) {
      // console.log(returnCitySN);
      this.shopInfo.classify.op_id = value[0];
      this.shopInfo.classify.ch_id = value[1];
    },
    // 删除活动
    removeActivity(activity) {
      var index = this.shopInfo.activities.indexOf(activity);
      if (index !== -1) {
        this.shopInfo.activities.splice(index, 1);
      }
    },
    // 新增活动
    addActivity() {
      this.shopInfo.activities.push({
        value: "",
        key: Date.now(),
      });
    },
    // 添加/移除店铺头像时更改验证规则
    appendAvatar() {
      this.status.shop_avatar = !this.status.shop_avatar;
    },
    // 添加/移除营业执照时更改验证规则
    appendBusiness() {
      this.status.shop_business = !this.status.shop_business;
    },
    // 添加/移除健康证明时更改验证规则
    appendHealth() {
      this.status.shop_health = !this.status.shop_health;
    },
    // 通过dialog显示图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 往formdata添加图片信息
    handleUpload(file) {
      this.fileFormData.append("file", file.file);
    },
    // 提交数据前的处理
    beforeSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将图片信息分别追加至form-data
          this.$refs.avatar.submit();
          this.$refs.business.submit();
          this.$refs.health.submit();
          // 将el-form中的数据追加至fileFormData
          this.fileFormData.append("data", JSON.stringify(this.shopInfo));
          // 判断店铺名是否已被注册
          this.judgeShopExist();
          if (!this.shopExist) this.submitForm();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 提交数据
    submitForm() {
      this.$api.userApis
        .createShop({
          data: this.fileFormData,
          config: this.cconfig,
          // 使用箭头函数, 否则this指向progressEvent.currentTarget
          // 箭头函数指向执行上下文中的this（由词法作用域决定）
          onUploadProgress: (progressEvent) => {
            // console.log(progressEvent);
            let percent = parseInt(
              ((progressEvent.loaded / progressEvent.total) * 100).toFixed(0)
            );
            this.percentage = percent;
          },
        })
        .then((res) => {
          if (res.code == 200) {
            this.hasShop = true;
            this.$message({
              type: "success",
              message: res.message,
            });
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
  width: 50%;
  margin-right: 30px;
}

.icon-wenhao {
  position: relative;
  top: -10px;
  margin: 0 10px 0 -10px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: skyblue;
  }
}

.progress {
  width: 33%;
}

.submit-wrap {
  margin-left: 15%;
}
</style>