<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="!isCollapse ? '210px' : '60px'"><nav-aside /></el-aside>
      <el-container class="page">
        <el-header class="page-header"><nav-header /></el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavAside from "@/components/content/nav-aside/navAside.vue";
import NavHeader from "../../components/content/nav-header/navHeader.vue";
export default {
  components: { NavAside, NavHeader },
  name: "",
  computed: {
    ...mapState({
      isCollapse: (state) => state.global.isCollapse,
    }),
  },
};
</script>

<style lang="scss">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.page-header {
  display: flex;
  align-items: center;
  background-color: #fff;
  color: #333;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  // line-height: 200px;
  text-align: left;
  cursor: pointer;
  color: #333;
  background-color: #545c64;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.page-content {
  background-color: #f0f2f5;
  color: #333;
  // text-align: center;
  height: calc(100vh - 60px);

  .page-info {
    background-color: #fff;
    border-radius: 5px;
  }
}
</style>