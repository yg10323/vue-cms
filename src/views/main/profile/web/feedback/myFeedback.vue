<template>
  <div class="my-feedback">
    <el-tag type="danger">只是最简单的回复功能,没有做过多的逻辑判断</el-tag>
    <div class="collapse-wrap">
      <el-collapse v-for="(item, index) in feedbackList" :key="index">
        <el-collapse-item :title="item.title">
          <div class="parent">
            <el-tag>{{ item.type }}</el-tag>
            <span>{{ item.content }}</span>
          </div>
          <div
            class="children"
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
          >
            <el-tag>{{ childItem.type }}</el-tag>
            <span>{{ childItem.content }}</span>
            <span v-if="childIndex == item.children.length - 1">
              <el-button class="btn-reply" type="text"
                >回复的为此条内容哦</el-button
              >
            </span>
            <div
              class="text-area"
              v-if="childIndex == item.children.length - 1"
            >
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入回复内容..."
                v-model="content"
                @focus="setCurrentRow(item.children[item.children.length - 1])"
              >
              </el-input>
              <el-button class="btn-submit" type="primary" @click="submitReply"
                >提交</el-button
              >
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      feedbackList: "",
      showTextArea: false,
      currentRow: {},
      content: "",
    };
  },
  created() {
    this.getMyFeedback();
  },
  methods: {
    // 获取工单以及回复
    getMyFeedback() {
      this.$api.userApis.getMyFeedback().then((res) => {
        if (res.code == 200) {
          this.feedbackList = this.$utils.dealFeedback(res.data);
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },
    // 记录回复的是哪一条数据
    setCurrentRow(currentRow) {
      this.currentRow = currentRow;
    },
    // 提交回复
    submitReply() {
      if (this.content == "") {
        this.$message({ type: "error", message: "回复内容不能为空" });
        return;
      }

      const account = JSON.parse(localStorage.getItem("userInfo")).account;
      // option为数据库表名
      const addInfo = {
        option: "feedback",
        content: `来自${account}的回复: ` + this.content,
        title: this.currentRow.title,
        seller_id: this.currentRow.seller_id,
        feedback_id: this.currentRow.id,
        type: "reply",
      };

      // 如果没有belong, 说明回复的这条数据为首次发的工单
      if (this.currentRow.belong == null) {
        addInfo.belong = addInfo.feedback_id;
      } else {
        addInfo.belong = this.currentRow.belong;
      }

      this.$api.userApis.replyFeedback({ data: addInfo }).then((res) => {
        if (res.code == 200) {
          this.$message({ type: "success", message: res.message });
          setTimeout(() => location.reload(), 1000);
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.collapse-wrap {
  margin-top: 30px;
}
.el-tag {
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
}
.parent {
  font-weight: 700;
}
.children {
  margin: 10px 0 0 25px;

  .btn-reply {
    margin-left: 30px;
    font-size: 12px;
  }
}

.btn-submit {
  margin-top: 10px;
}
</style>

<style>
.el-collapse-item__header {
  font-weight: 700;
  font-size: 18px;
}
</style>