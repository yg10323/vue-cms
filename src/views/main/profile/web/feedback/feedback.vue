<template>
  <div class="add">
    <div class="title">
      主题
      <el-input placeholder="请输入反馈主题" v-model="contentInfo.title">
      </el-input>
    </div>
    <div class="content">
      <el-input
        type="textarea"
        :rows="10"
        placeholder="请在此输入反馈内容..."
        v-model="contentInfo.content"
      >
      </el-input>
    </div>
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
import { mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      contentInfo: {
        title: "",
        content: "",
        type: "feedback",
      },
    };
  },
  created() {
    this.$notify({
      type: "warning",
      title: "说明",
      message:
        "该组件的同级目录下名为 富文本.vue 的组件为富文本编辑器, 该组件使用文本域做简单处理",
    });
  },
  methods: {
    submitData() {
      if (!this.contentInfo.title || !this.contentInfo.content) {
        this.$message({ type: "error", message: "主题或反馈内容为空" });
        return;
      }
      this.$api.userApis
        .postFeedBack({ data: this.contentInfo })
        .then((res) => {
          if (res.code == 200) {
            this.$message({ type: "success", message: res.message });
            // 跳转
            setTimeout(() => {
              // 跳转
              this.setActive("1021");
              this.$router.push({ path: "/main/profile/my_feedback" });
            }, 1000);
          } else {
            this.$message({ type: "error", message: res.message });
          }
        });
    },
    ...mapMutations(["setActive"]),
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