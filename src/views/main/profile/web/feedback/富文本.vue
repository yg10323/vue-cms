<template>
  <div class="add">
    <div class="title">
      主题
      <el-input placeholder="请输入反馈主题" v-model="contentInfo.title">
      </el-input>
    </div>
    <mavon-editor
      v-model="contentInfo.content"
      style="min-height: 470px; max-height: 500px"
      @save="save"
      @imgAdd="imgAdd"
    >
    </mavon-editor>
    <div class="add_footer">
      <div class="footer_top">
        <span>
          <el-button type="primary" @click="submitData">提交</el-button>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
//安装 npm i mavon-editor
// 在main.js中引入并注册
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// Vue.use(mavonEditor)

export default {
  name: "",
  data() {
    return {
      contentInfo: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    save(value, render) {
      this.$message("已保存书写内容");
    },
    imgAdd(filename, imgfile) {
      this.$message("图片上传功能暂未添加");
    },
    submitData() {
      if (!this.contentInfo.title || !this.contentInfo.content) {
        this.$message({ type: "error", message: "主题或反馈内容为空" });
        return;
      }

      this.$api.userApis
        .postFeedBack({ data: this.contentInfo })
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  padding: 10px;
  .el-input {
    margin-left: 10px;
    max-width: 400px;
  }
}

.add_footer {
  padding: 20px 10px 10px;
  .el-input {
    margin-left: 10px;
    max-width: 200px;
  }

  .el-select {
    margin-left: 10px;
  }

  .footer_top {
    margin-bottom: 10px;

    span {
      margin-right: 20px;
    }
  }
}
</style>