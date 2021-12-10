<template>
  <div class="orders-today">
    <el-table
      :data="paginationOrders"
      :default-sort="{ prop: 'id', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column prop="id" label="序号" sortable width="50">
      </el-table-column>
      <el-table-column prop="createTime" label="下单时间" sortable width="170">
      </el-table-column>
      <el-table-column label="订单信息">
        <el-table-column label="食品信息" width="120">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div v-for="(info, index) in scope.row.food_info" :key="index">
                <p>名称: {{ info.name }}</p>
                <p>成本: {{ info.cost }}</p>
                <p>价格: {{ info.price }}</p>
                <p>折扣: {{ info.discount }}</p>
                <p>打包费: {{ info.extra }}</p>
              </div>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看食品信息</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="价格明细" width="120">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>总价格: {{ scope.row.total_price }}</p>
              <p>用户支付: {{ scope.row.pay_price }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">查看明细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="收货人信息">
          <el-table-column prop="buyer_info.name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="buyer_info.phone" label="电话" width="120">
          </el-table-column>
          <el-table-column prop="buyer_info.address" label="地址" width="300">
          </el-table-column>
        </el-table-column>

        <el-table-column label="订单状态" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.done ? 'primary' : 'success'"
              disable-transitions
              >{{ scope.row.done ? "进行中" : "已完成" }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        @current-change="currentChange"
        @size-change="sizeChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 50, 70, 100, 500]"
        layout="total, sizes, prev, pager, next ,jumper"
        :total="orders.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  created() {
    this.getOrdersAll();
  },
  data() {
    return {
      orders: [],
      paginationOrders: [],
      currentPage: 1,
      pageSize: 10,
    };
  },
  methods: {
    // 获取今日订单
    getOrdersAll() {
      this.$api.shopApis.getOrdersAll().then((res) => {
        if (res.code === 200) {
          // 合并同一订单的食品信息
          this.orders = this.$utils.dealOrderData(res.data);
          // 格式化时间
          this.orders.forEach((item) => {
            item.updateTime = this.$utils.formatTime(
              new Date(item.updateTime).getTime()
            );
            item.createTime = this.$utils.formatTime(
              new Date(item.updateTime).getTime()
            );
          });

          this.paginationOrders = this.orders;
          // 分页
          this.handlePageChange(this.currentPage);
        } else {
          this.$notify({
            title: "提示",
            message: res.message,
            type: "warning",
          });
        }
      });
    },
    // pageSize 改变时
    sizeChange(pageSize) {
      this.pageSize = pageSize;
      this.currentChange(this.currentPage);
    },
    // currentPage 改变时
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.handlePageChange(currentPage);
    },
    // 对数据进行分页处理
    handlePageChange(currentPage) {
      let from = (currentPage - 1) * this.pageSize;
      let to = currentPage * this.pageSize;
      this.paginationOrders = [];
      for (; from < to; from++) {
        if (this.orders[from]) {
          this.paginationOrders.push(this.orders[from]);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.name-wrapper {
  cursor: pointer;
}
.pagination {
  margin-top: 20px;
}
</style>