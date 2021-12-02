<template>
  <div class="manage">
    <el-container>
      <el-aside width="auto"> 侧边栏</el-aside>
      <el-container>
        <el-header>顶部</el-header>
        <el-main>
          <div class="content">
            <!-- <router-view></router-view> -->
            显示区域
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
};
</script>

<style lang="scss">
.el-header {
  display: flex;
  align-items: center;
  background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  background-color: #545c64;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  height: calc(100vh - 60px);
}
.content {
  background-color: #fff;
}
</style>