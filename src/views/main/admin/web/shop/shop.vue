<template>
  <div class="shop-manage">
    <div class="search-form">
      <search-form
        :searchConfig="ShopSearchFormConfig"
        @resetSearchForm="resetSearchForm"
        @searchFormRequest="searchFormRequest"
      />
    </div>

    <div class="table-data">
      <table-form
        :tableData="defaultShowInfo"
        v-bind="ShopTableFormConfig"
        @handleOffsetChange="handleOffsetChange"
        @handlePageChange="handlePageChange"
      >
        <!-- 头部插槽 -->
        <template #handler>
          <el-tag type="danger">店铺只允许卖家账号注册添加</el-tag>
        </template>
        <!-- 表格插槽 -->
        <template #shop_avatar_url="slotProps">
          <el-image :src="slotProps.row.shop_avatar_url"></el-image>
        </template>
        <template #start_time="slotProps">
          {{ slotProps.row.start_time + " - " + slotProps.row.end_time }}
        </template>
        <template #usable="slotProps">
          <el-button
            class="btn-usable"
            plain
            size="mini"
            :type="slotProps.row.usable ? 'success' : 'danger'"
            @click="handleUsable(slotProps.row)"
            >{{ slotProps.row.usable ? "正常" : "封禁" }}</el-button
          >
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

          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定要删除该账号吗？"
            @confirm="deleteShop(slotProps.row)"
          >
            <el-button
              class="btn-delete"
              size="mini"
              icon="el-icon-delete"
              type="text"
              slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </table-form>
    </div>
  </div>
</template>

<script>
import searchForm from "@/components/content/search-form/searchForm.vue";
import tableForm from "@/components/content/table-form/tableForm.vue";
import addForm from "@/components/content/add-form/addForm.vue";

import config from "../../config/shop-config.js";

export default {
  components: { searchForm, tableForm, addForm },
  name: "",
  data() {
    return {
      ShopSearchFormConfig: config.ShopSearchFormConfig,
      ShopTableFormConfig: config.ShopTableFormConfig,
      defaultShowInfo: {},
      query: { role: "shop", page: 1, offset: 10 },
      showDialog: false,
    };
  },
  created() {
    this.getShopByQuery();
  },
  methods: {
    // 重置
    resetSearchForm() {
      this.query = { role: "shop", page: 1, offset: 10 };
      this.getShopByQuery();
    },
    // 根据参数请求数据
    searchFormRequest(queryData) {
      queryData = this.$utils.removeEmpty(queryData);
      this.query = { ...this.query, ...queryData };
      // console.log(this.query);
      this.getShopByQuery();
    },
    // 根据query获取shop
    getShopByQuery() {
      this.$api.adminApis.getShopList({ data: this.query }).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.defaultShowInfo = res.data;
        } else {
          this.$notify.error({ title: "错误", message: res.message });
        }
      });
    },
    // 控制dialog
    handleDialog() {
      this.showDialog = !this.showDialog;
    },
    // 更改usable
    handleUsable(row) {
      this.$api.adminApis
        .changeShopUsable({
          data: { usable: !row.usable, id: row.id },
        })
        .then((res) => {
          if (res.code == 200) {
            this.getShopByQuery();
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
    // 删除shop
    deleteShop(row) {
      this.$api.adminApis.deleteShop({ data: { id: row.id } }).then((res) => {
        if (res.code == 200) {
          this.getShopByQuery();
        } else {
          this.$notify.error({ title: "错误", message: res.message });
        }
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
.btn-delete {
  color: #f56c6c;
}
</style>