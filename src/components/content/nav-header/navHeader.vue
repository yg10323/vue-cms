<template>
  <div class="nav-header">
    <i
      class="nav-collapse"
      :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="changeCollapse"
    >
    </i>
    <div class="header-content">
      <!-- 左侧面包屑 -->
      <div class="header-content-bread">面包屑</div>
      <!-- 右侧用户头像 -->
      <div class="header-content-user">
        <el-dropdown @command="handleCommand" class="dropdown">
          <span class="el-dropdown-link">
            <i class="iconfont icon-iconzhucetouxiang"></i>
            {{ userName }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="myself">我的信息</el-dropdown-item>
            <el-dropdown-item command="quit" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "",
  computed: {
    ...mapState({
      isCollapse: (state) => state.global.isCollapse,
    }),
    userName() {
      return JSON.parse(localStorage.getItem("userInfo")).account;
    },
  },
  methods: {
    changeCollapse() {
      this.changeCollapse();
    },
    handleCommand(command) {
      if (command === "quit") {
        // 退出,清空storage并跳转
        this.clearStorage();
        // 刷新页面
        location.reload();
      } else if (command === "myself") {
        // 修改侧边栏选中状态为个人信息,同时跳转路由
        this.setActive("1013");
        this.$router.push({ path: "/main/profile/myself" });
      }
    },
    ...mapMutations(["changeCollapse", "clearStorage", "setActive"]),
  },
};
</script>

<style scoped lang="scss">
.nav-header {
  display: flex;
  width: 100%;

  .nav-collapse {
    font-size: 30px;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }

  .header-content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    font-size: 14px;
  }
}

.header-content-user {
  .dropdown {
    cursor: pointer;
    user-select: none;
  }
}

el-dropdown-link {
  // cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.iconfont {
  font-size: 20px;
}
</style>