<template>
  <div class="feedback-manage">
    <div class="search-form">
      <search-form
        :searchConfig="FeedbackSearchFormConfig"
        @resetSearchForm="resetSearchForm"
        @searchFormRequest="searchFormRequest"
      />
    </div>

    <div class="table-data">
      <table-form
        :tableData="defaultShowInfo"
        v-bind="FeedbackTableFormConfig"
        @handleOffsetChange="handleOffsetChange"
        @handlePageChange="handlePageChange"
      >
        <!-- 表格插槽 -->
        <template #createTime="slotProps">
          {{ $utils.formatTime(new Date(slotProps.row.createTime).getTime()) }}
        </template>
        <template #updateTime="slotProps">
          {{ $utils.formatTime(new Date(slotProps.row.updateTime).getTime()) }}
        </template>
        <template #handle="slotProps">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="text"
            @click="handleEdit(slotProps.row)"
            >回复</el-button
          >
        </template>
      </table-form>
    </div>

    <div class="replay-form">
      <el-dialog title="回复" :visible.sync="showDialog" width="40%" center>
        <div class="post-content">
          <el-collapse>
            <el-collapse-item :title="replayRow.title" name="1">
              <div>{{ replayRow.content }}</div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <add-form
          :addConfig="FeedbackAddFormConfig"
          @addFormRequest="addFormRequest"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import searchForm from "@/components/content/search-form/searchForm.vue";
import tableForm from "@/components/content/table-form/tableForm.vue";
import addForm from "@/components/content/add-form/addForm.vue";

import config from "../../config/feedback-config.js";

export default {
  components: { searchForm, tableForm, addForm },
  name: "",
  data() {
    return {
      FeedbackSearchFormConfig: config.FeedbackSearchFormConfig,
      FeedbackTableFormConfig: config.FeedbackTableFormConfig,
      FeedbackAddFormConfig: config.FeedbackAddFormConfig,
      defaultShowInfo: {},
      query: { role: "feedback", page: 1, offset: 10 },
      showDialog: false,
      replayRow: "",
    };
  },
  created() {
    this.getFeedbackByQuery();
  },
  methods: {
    // 重置
    resetSearchForm() {
      this.query = { role: "feedback", page: 1, offset: 10 };
      this.getFeedbackByQuery();
    },
    // 根据参数请求数据
    searchFormRequest(queryData) {
      queryData = this.$utils.removeEmpty(queryData);
      this.query = { ...this.query, ...queryData };
      // console.log(this.query);
      this.getFeedbackByQuery();
    },
    // 根据query获取shop
    getFeedbackByQuery() {
      this.$api.adminApis.getShopList({ data: this.query }).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.defaultShowInfo = res.data;
        } else {
          this.$notify.error({ title: "错误", message: res.message });
        }
      });
    },
    // 提交回复
    addFormRequest(data) {
      //title,content,seller_id, id
      data.content = "来自admin的回复: " + data.content;
      const addInfo = {
        ...data,
        title: this.replayRow.title,
        seller_id: this.replayRow.seller_id,
        feedback_id: this.replayRow.id,
        type: "reply",
      };
      // 如果没有belong, 说明回复的这条数据为首次发的工单
      if (this.replayRow.belong == null) {
        addInfo.belong = addInfo.feedback_id;
      } else {
        addInfo.belong = this.replayRow.belong;
      }

      this.$api.adminApis.replyFeedback({ data: addInfo }).then((res) => {
        if (res.code == 200) {
          this.$message({ type: "success", message: res.message });
          setTimeout(() => location.reload(), 1000);
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },
    // 编辑
    handleEdit(row) {
      this.replayRow = row;
      this.showDialog = !this.showDialog;
    },
    // 分页: 页数改变
    handlePageChange(page) {
      this.query.page = page;
      this.getFeedbackByQuery();
    },
    // 分页: 每页数量改变
    handleOffsetChange(offset) {
      this.query.offset = offset;
      this.getFeedbackByQuery();
    },
  },
};
</script>

<style scoped lang="scss">
.post-content {
  text-align: center;
  margin-bottom: 20px;
}
</style>