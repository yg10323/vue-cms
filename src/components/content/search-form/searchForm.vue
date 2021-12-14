<template>
  <div class="search-form">
    <el-form label-width="100px" :model="formData" ref="formData">
      <el-row>
        <el-col
          v-bind="colLayout"
          v-for="item in searchConfig"
          :key="item.label"
        >
          <el-form-item
            :label="item.label"
            style="padding: 5px 30px"
            :prop="item.prop"
            :rules="item.rules"
          >
            <!-- 输入框 / 密码框 -->
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :placeholder="item.placeholder"
                :show-password="item.type === 'password'"
                v-model="formData[item.prop]"
              />
            </template>

            <!-- 下拉列表 -->
            <template v-else-if="item.type === 'select'">
              <el-select
                :label="item.label"
                :placeholder="item.placeholder"
                v-model="formData[item.prop]"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.label"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </template>

            <!-- 日期选择 -->
            <template v-else -if="item.type === 'datepicker'">
              <el-date-picker
                v-model="formData[item.prop]"
                v-bind="item.otherOptions"
                style="width: 110%"
              ></el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="search-btns">
        <slot name="10">
          <el-button icon="el-icon-refresh-right" @click="resetForm('formData')"
            >重置</el-button
          >
          <el-button
            type="info"
            icon="el-icon-search"
            @click="searchRequest('formData')"
            >搜索</el-button
          >
        </slot>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    searchConfig: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        id: "",
        name: "",
        account: "",
        password: "",
        role: "",
        time: "",
        title: "",
        author: "",
        classify: "",
      },
      colLayout: {
        xl: 8,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      },
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("resetSearchForm");
    },
    searchRequest(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("searchFormRequest", this.formData);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.el-form {
  padding-top: 22px;
}
.search-btns {
  text-align: right;
  padding: 0 30px 20px 0;
}
</style>