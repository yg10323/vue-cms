<template>
  <div class="add-form">
    <div style="margin-bottom: 30px">
      <el-radio-group
        class="radio-group"
        v-model="options"
        size="small"
        v-for="option in addConfig.options"
        :key="option"
        @change="radioChange"
      >
        <el-radio-button class="radio-button" :label="option"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="form">
      <el-form label-width="100px" :model="formData" :ref="formData">
        <el-row>
          <el-col v-for="item in addConfig[options]" :key="item.label">
            <el-form-item
              :label="item.label"
              style="padding: 5px 30px"
              :prop="item.prop"
              :rules="item.rules"
            >
              <!-- 输入框 / 密码框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :clearable="item.clearable"
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

              <!-- radio -->
              <template v-else-if="item.type === 'radio'">
                <el-radio
                  v-model="formData[item.prop]"
                  :label="item.label"
                  :disabled="item.disabled"
                  :checked="item.checked"
                  >{{ item.placeholder }}</el-radio
                >
              </template>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="submit-btns">
          <slot name="10">
            <el-button
              icon="el-icon-refresh-right"
              @click="handleReset(formData)"
              >重置</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-check"
              @click="handleSubmit(formData)"
              >提交</el-button
            >
          </slot>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    addConfig: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      formName: "formData",
      options: this.addConfig.options[0],
      formData: {},
    };
  },
  methods: {
    radioChange() {
      this.formData = {};
    },
    handleReset(formName) {
      this.$refs[formName].resetFields();
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData.option = this.options;
          this.$emit("addFormRequest", this.formData);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.submit-btns {
  text-align: center;
}
</style>