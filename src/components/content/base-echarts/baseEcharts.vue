<template>
  <div class="base-echarts">
    <div
      class="echarts-wrap"
      ref="baseEcharts"
      :style="{ width: width, height: height }"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import ChinaMapData from "./data/china.json";
export default {
  name: "",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "260px",
    },
    option: {
      type: Object,
      required: true,
      default: () => {},
    },
    showMap: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      if (this.showMap) {
        echarts.registerMap("china", ChinaMapData);
      }
      let echartsInstance = echarts.init(this.$refs.baseEcharts);
      echartsInstance.setOption(this.option);
    },
  },
};
</script>

<style scoped lang="scss">
</style>