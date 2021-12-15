<template>
  <div class="order-manage">
    <div class="search-form">
      <search-form
        :searchConfig="OrderSearchFormConfig"
        @resetSearchForm="resetSearchForm"
        @searchFormRequest="searchFormRequest"
      />
    </div>
    <div class="table-data">
      <table-form
        :tableData="defaultShowInfo"
        v-bind="OrderTableFormConfig"
        @handleOffsetChange="handleOffsetChange"
        @handlePageChange="handlePageChange"
      >
        <!-- 表格插槽 -->
        <template #done="slotProps">
          <el-button
            class="btn-usable"
            plain
            size="mini"
            :type="slotProps.row.done ? 'primary' : 'info'"
            @click="handleStatus(slotProps.row)"
            >{{ slotProps.row.done ? "进行中" : "已完成" }}</el-button
          >
        </template>
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
            >编辑</el-button
          >
        </template>
      </table-form>
    </div>
  </div>
</template>

<script>
import searchForm from "@/components/content/search-form/searchForm.vue";
import tableForm from "@/components/content/table-form/tableForm.vue";

import config from "../../config/order-config.js";
export default {
  components: { searchForm, tableForm },
  name: "",
  data() {
    return {
      OrderSearchFormConfig: config.OrderSearchFormConfig,
      OrderTableFormConfig: config.OrderTableFormConfig,
      defaultShowInfo: {},
      query: { role: "orders", page: 1, offset: 10 },
      showDialog: false,
    };
  },
  created() {
    this.getOrderByQuery();
  },
  methods: {
    // 重置
    resetSearchForm() {
      this.query = { role: "orders", page: 1, offset: 10 };
      this.getOrderByQuery();
    },
    // 根据参数请求数据
    searchFormRequest(queryData) {
      queryData = this.$utils.removeEmpty(queryData);
      this.query = { ...this.query, ...queryData };
      // console.log(this.query);
      this.getOrderByQuery();
    },
    // 根据query获取shop
    getOrderByQuery() {
      this.$api.adminApis.getOrderList({ data: this.query }).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.defaultShowInfo = res.data;
        } else {
          this.$notify.error({ title: "错误", message: res.message });
        }
      });
    },
    // 订单状态
    handleStatus(row) {
      this.$api.adminApis
        .changeOrderStatus({
          data: { done: !row.done, id: row.id },
        })
        .then((res) => {
          if (res.code == 200) {
            this.getOrderByQuery();
          } else {
            this.$notify.error({ title: "错误", message: res.message });
          }
        });
    },
    // 编辑
    handleEdit(row) {
      this.$notify({
        type: "warning",
        title: "提示",
        message: "编辑功能还没写",
      });
    },
    // 分页: 页数改变
    handlePageChange(page) {
      this.query.page = page;
      this.getShopByQuery();
    },
    // 分页: 每页数量改变
    handleOffsetChange(offset) {
      this.query.offset = offset;
      this.getShopByQuery();
    },
  },
};
</script>

<style scoped lang="scss">
.search-form {
  margin-bottom: 30px;
}
</style>