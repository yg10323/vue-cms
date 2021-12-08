<template>
  <div class="add-food">
    <div v-if="hasShop">
      <el-form
        :model="foodForm"
        ref="foodForm"
        :rules="rules"
        label-width="100px"
        class="food-form"
      >
        <!-- 食品名 -->
        <el-form-item label="食品名称" prop="name">
          <el-input class="input" v-model="foodForm.name"></el-input>
        </el-form-item>

        <!-- 食品分类 -->
        <el-form-item label="食品分类" prop="foodClassify">
          <el-select
            v-model="foodForm.foodClassify"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择/自行输入分类"
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

        <!-- 价格 -->
        <el-form-item label="价格" prop="price">
          <el-input
            class="input input-price"
            v-model="foodForm.price"
          ></el-input>
        </el-form-item>

        <!-- 折扣 -->
        <el-form-item label="折扣" prop="discount">
          <el-input
            class="input input-price"
            v-model="foodForm.discount"
          ></el-input>
        </el-form-item>

        <!-- 打包费 -->
        <el-form-item label="打包费" prop="extra">
          <el-input
            class="input input-price"
            v-model="foodForm.extra"
          ></el-input>
        </el-form-item>

        <!-- 起购数 -->
        <el-form-item label="起购数" prop="least">
          <el-input-number
            v-model="foodForm.least"
            :min="1"
            :max="30"
          ></el-input-number>
        </el-form-item>

        <!-- 单点不送 -->
        <el-form-item label="单点不送" prop="single_point">
          <el-switch v-model="foodForm.single_point"></el-switch>
        </el-form-item>

        <!-- 店铺头像图片 -->
        <el-form-item
          label="食品图片"
          prop="food_avatar"
          :required="food_avatar"
        >
          <el-upload
            action="#"
            ref="avatar"
            list-type="picture-card"
            :on-remove="appendAvatar"
            :on-change="appendAvatar"
            :auto-upload="false"
            :http-request="handleUpload"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
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
    <div v-else>还未注册店铺, 无法添加食品信息</div>
  </div>
</template>

<script>
import config from "../../config/food-config";
export default {
  name: "",
  created() {
    this.fileFormData = new FormData(); // 用于收集图片信息, 上传使用
    this.getFoodClassify(); //获取食品分类

    this.$notify.info({
      title: "提示",
      message: "如要添加更多食品相关的信息请在添加完食品后到☛食品信息☚中添加",
    });
  },
  data() {
    return { ...config.add_config };
  },
  methods: {
    // 图片验证规则
    appendAvatar() {
      this.food_avatar = !this.food_avatar;
    },
    // 往formdata添加图片信息
    handleUpload(file) {
      this.fileFormData.append("file", file.file);
    },
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
    // 提交前的数据处理
    beforeSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.avatar.submit();
          this.fileFormData.append("data", JSON.stringify(this.foodForm));
          this.submit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 提交数据
    submit() {
      this.$api.foodApis
        .addFood({
          data: this.fileFormData,
          config: this.cconfig,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              typer: "success",
              message: res.message,
            });
          } else {
            this.$message({
              typer: "error",
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
  width: 40%;
  margin-right: 30px;
}
.input-price {
  width: 19%;
}
.el-select {
  width: 30%;
}
</style>