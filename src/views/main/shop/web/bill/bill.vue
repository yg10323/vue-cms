<template>
  <div class="bill">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card title="店铺食品销量">
          <base-echarts
            :option="soldOption"
            v-if="soldOption.series[0].name"
          ></base-echarts>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card title="店铺账单">
          <base-echarts
            :option="billOption"
            v-if="billOption.series[0].data.length"
          ></base-echarts>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card title="订单地点分布">
          <base-echarts
            :showMap="true"
            height="400px"
            :option="mapOption"
            v-if="mapOption.series[2].data.length"
          ></base-echarts>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 地图参考: https://www.makeapie.com/editor.html?c=xpRBiwXx_P
import elCard from "@/components/content/el-card/elCard.vue";
import BaseEcharts from "@/components/content/base-echarts/baseEcharts.vue";

import { soldOption, billOption, mapOption } from "../../config/echarts-config";
export default {
  components: { elCard, BaseEcharts },
  name: "",
  created() {
    this.getSold();
    this.getBill();
    this.getMapData();
  },
  data() {
    return {
      soldOption,
      billOption,
      mapOption,
    };
  },
  methods: {
    // 获取店铺销售数量
    getSold() {
      this.$api.shopApis.getSold().then((res) => {
        if (res.code == 200) {
          let xAxisData = [],
            seriesData = [],
            seriesName = "已售";
          for (let item of res.data) {
            xAxisData.push(item.name);
            seriesData.push(item.sold);
          }
          this.soldOption.xAxis[0].data = xAxisData;
          this.soldOption.series[0].data = seriesData;
          this.soldOption.series[0].name = seriesName;
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },
    // 获取店铺流水
    getBill() {
      this.$api.shopApis.getBill().then((res) => {
        if (res.code == 200) {
          const seriesData = [];
          const data = res.data[0];
          for (let i of Object.keys(data)) {
            const temp = {};
            temp.value = data[i];
            temp.name = i;
            seriesData.push(temp);
          }
          this.billOption.series[0].data = seriesData;
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },
    // 获取订单的分布以及数量
    getMapData() {
      this.$api.shopApis.getMapData().then((res) => {
        if (res.code == 200) {
          const seriesData = this.$utils.convertData(res.data);
          this.mapOption.series[0].data = seriesData;
          this.mapOption.series[1].data = res.data;
          this.mapOption.series[2].data = seriesData;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 30px;
}
</style>