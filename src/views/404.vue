<template>
  <div class="not-found">
    <el-empty description="这是一片荒芜之地...😸😺">
      <el-button type="danger" @click="goBack">返回</el-button>
    </el-empty>
  </div>
</template>

<script>
export default {
  name: "",
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="scss">
.not-found {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>