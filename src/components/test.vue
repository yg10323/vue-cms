<template>
  <div class="test">
    <el-upload
      action="#"
      list-type="picture-card"
      :on-change="change"
      :auto-upload="false"
      :multiple="true"
      ref="uploadAction"
      :http-request="handleUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-button @click="btnUploadClick">上传</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
      formData: "",
    };
  },
  methods: {
    change(file, fileList) {
      console.log(this.$refs.uploadAction.uploadFiles);
    },
    handleUpload(file) {
      this.formData.append("file", file.file);
    },
    btnUploadClick() {
      this.formData = new FormData();
      this.$refs.uploadAction.submit();
    },
  },
};
</script>

<style scoped lang="scss">
</style>
<style>
.test {
  position: relative;
  top: 20%;
  left: 40%;
}
</style>