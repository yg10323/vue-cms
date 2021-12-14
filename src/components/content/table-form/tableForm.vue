<template>
  <div class="table-form">
    <div class="table-header">
      <slot name="tableTitle">
        <span class="table-title">{{ title }}</span>
      </slot>
      <div class="handler">
        <slot name="handler"></slot>
      </div>
    </div>
    <!-- 表格相关 -->
    <el-table :data="tableData.data" style="width: 100%" border>
      <el-table-column
        v-if="isShowIndex"
        type="index"
        label="序号"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column
        v-for="propItem in propList"
        :key="propItem.prop"
        v-bind="propItem"
        align="center"
        :show-overflow-tooltip="true"
      >
        <!-- 作用域插槽 -->
        <template #default="slotProps">
          <!-- 动态具名插槽 -->
          <slot :name="propItem.slotName" :row="slotProps.row">
            {{ slotProps.row[propItem.prop] }}
          </slot>

          <!-- 动态名插槽替换方式,在父组件中 -->
          <!-- <template #id(与slotName保持一致)="slotProps">
            <el-button>{{ slotProps.row.id }}</el-button>
          </template> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="table-footer">
      <slot name="pagination">
        <el-pagination
          @size-change="handleOffsetChange"
          @current-change="handlePageChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.totalCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    propList: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Object,
      default: () => {},
    },
    isShowIndex: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "信息列表",
    },
  },
  methods: {
    handleOffsetChange(size) {
      this.$emit("handleOffsetChange", size);
    },
    handlePageChange(page) {
      this.$emit("handlePageChange", page);
    },
  },
};
</script>

<style lang="scss">
.table-form {
  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0 5px;
    .table-title {
      font-size: 18px;
      font-weight: 700;
      color: #95989d;
    }
  }

  .table-footer {
    margin-top: 20px;
  }
}
</style>