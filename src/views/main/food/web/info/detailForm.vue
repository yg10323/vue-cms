<template>
  <div class="food-detail">
    <!-- 表单信息 -->
    <el-form
      :model="foodForm"
      ref="foodForm"
      label-width="100px"
      class="food-form"
    >
      <!-- 食品名 -->
      <el-form-item label="食品名称" prop="name">
        <el-input
          class="input"
          placeholder="请输入新的食品名称"
          v-model="foodForm.name"
        ></el-input>
      </el-form-item>

      <!-- 食品分类 -->
      <el-form-item label="食品分类" prop="foodClassify">
        <el-select
          v-model="foodForm.foodClassify"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请输入新的食品分类"
        >
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <!-- 成本 -->
      <el-form-item label="成本" prop="cost">
        <el-input
          class="input input-price"
          v-model="foodForm.cost"
          placeholder="请输入新的成本"
        ></el-input>
      </el-form-item>

      <!-- 价格 -->
      <el-form-item label="价格" prop="price">
        <el-input
          class="input input-price"
          v-model="foodForm.price"
          placeholder="请输入新的食品价格"
        ></el-input>
      </el-form-item>

      <!-- 折扣 -->
      <el-form-item label="折扣" prop="discount">
        <el-input
          class="input input-price"
          v-model="foodForm.discount"
          placeholder="请输入新的食品折扣"
        ></el-input>
      </el-form-item>

      <!-- 打包费 -->
      <el-form-item label="打包费" prop="extra">
        <el-input
          class="input input-price"
          v-model="foodForm.extra"
          placeholder="请输入新的打包费"
        ></el-input>
      </el-form-item>

      <!-- 起购数 -->
      <el-form-item label="起购数" prop="least">
        <el-input-number
          v-model="foodForm.least"
          :min="0"
          :max="30"
        ></el-input-number>
      </el-form-item>

      <!-- 单点不送 -->
      <el-form-item label="单点不送" prop="single_point">
        <el-switch v-model="foodForm.single_point"></el-switch>
      </el-form-item>

      <!-- 店铺头像图片 -->
      <el-form-item label="食品图片" prop="food_avatar">
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

      <!-- 掌柜描述 -->
      <el-form-item label="掌柜描述" prop="desci">
        <el-input
          class="input"
          placeholder="给食品添加一个独特的描述信息"
          v-model="foodForm.desci"
        ></el-input>
      </el-form-item>
      <!-- 小tips -->
      <el-form-item label="tips" prop="tips">
        <el-input
          class="input"
          placeholder="暂时没想好用到哪"
          v-model="foodForm.tips"
        ></el-input>
      </el-form-item>
      <!-- 套餐内容 -->
      <el-form-item label="套餐内容" prop="package_content">
        <el-input
          class="input"
          placeholder="套餐描述, 如果不是套餐, 可忽略哦"
          v-model="foodForm.package_content"
        ></el-input>
      </el-form-item>
      <!-- 主料 -->
      <el-form-item label="主料" prop="main_material">
        <el-input
          class="input"
          placeholder="主料, 比如: 猪肉"
          v-model="foodForm.main_material"
        ></el-input>
      </el-form-item>
      <!-- 辅料 -->
      <el-form-item label="辅料" prop="secondary_material">
        <el-input
          class="input"
          placeholder="辅料, 比如: 大葱"
          v-model="foodForm.secondary_material"
        ></el-input>
      </el-form-item>
      <!-- 荤素 -->
      <el-form-item label="荤素" prop="meat_vegetable">
        <el-input
          class="input"
          placeholder="荤/素"
          v-model="foodForm.meat_vegetable"
        ></el-input>
      </el-form-item>
      <!-- 重量/份数 -->
      <el-form-item label="重量/份数 " prop="weight">
        <el-input
          class="input"
          placeholder="填写份数或重量, 比如: 1份 / 500g"
          v-model="foodForm.weight"
        ></el-input>
      </el-form-item>
      <!-- 口味 -->
      <el-form-item label="口味" prop="flavor">
        <el-input
          class="input"
          placeholder="口味, 比如: 甜到心里"
          v-model="foodForm.flavor"
        ></el-input>
      </el-form-item>

      <!-- 提交 -->
      <el-form-item class="submit-wrap">
        <el-button type="primary" @click="beforeSubmit('foodForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('foodForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import config from "../../config/food-config";
export default {
  name: "",
  props: {
    food_id: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.fileFormData = new FormData();
    this.getFoodClassify();
  },
  data() {
    return { ...config.detail_config };
  },
  methods: {
    // 获取店铺的食品分类
    getFoodClassify() {
      this.options = [];
      this.$api.foodApis.getFoodClassify().then((res) => {
        if (res.code == 200) {
          if (res.data.length > 0) {
            for (let item of res.data) {
              this.options.push({
                value: item.food_classify,
                label: item.food_classify,
              });
            }
          }
          this.hasShop = true;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    // 往formdata添加图片信息
    handleUpload(file) {
      this.fileFormData.append("file", file.file);
    },
    // 提交前的数据处理
    beforeSubmit(formName) {
      const data = this.$utils.removeEmpty(this.foodForm);
      const imgForm = this.$refs.avatar.uploadFiles[0]; //fileFormData
      if (JSON.stringify(data) === JSON.stringify({ least: 0 }) && !imgForm) {
        this.$notify.error({
          title: "警告",
          message: "检测到您并未有任何修改",
        });
      } else {
        if (data.least == 0) data.least = 1;
        this.$refs.avatar.submit();
        data.food_id = this.food_id; //携带food_id
        this.fileFormData.append("data", JSON.stringify(data));
        this.submit();
      }
    },
    // 提交数据
    submit() {
      this.$api.foodApis
        .updateFoodInfo({
          data: this.fileFormData,
          config: this.axios_config,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.message,
            });
            setTimeout(() => location.reload(), 1000);
          } else {
            this.$message({
              type: "error",
              message: res.message,
            });
          }
        });
      // 请求完成后初始化fileFormData
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
</style>