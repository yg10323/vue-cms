<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/images/logo.svg" alt="logo" />
      <span v-if="!isCollapse" class="title">外卖猫管理系统</span>
    </div>
    <div class="nav-el-menu">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical"
        :unique-opened="true"
        :collapse="isCollapse"
      >
        <!-- 没有子级菜单的一级路由 -->
        <el-menu-item
          v-for="menu in noChildren"
          :key="menu.id"
          :index="menu.id + ''"
          @click="handleClick(menu)"
        >
          <i :class="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </el-menu-item>

        <!-- 有子级菜单的 -->
        <el-submenu
          v-for="menu in hasChildren"
          :key="menu.id"
          :index="menu.id + ''"
        >
          <!-- 一级菜单 -->
          <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{ menu.title }}</span>
          </template>

          <!-- 二级菜单 -->
          <el-menu-item
            v-for="child in menu.children"
            :key="child.id"
            :index="child.id + ''"
            @click="handleClick(child)"
            >{{ child.title }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "",
  computed: {
    ...mapState({
      menus: (state) => state.login.menus,
      isCollapse: (state) => state.global.isCollapse,
      defaultActive: (state) => state.global.defaultActive,
    }),
    noChildren() {
      return this.menus.filter((item) => !item.children.length);
    },
    hasChildren() {
      return this.menus.filter((item) => item.children.length);
    },
  },
  data() {
    return {};
  },
  methods: {
    // 路由跳转
    handleClick(route) {
      // 将默认活跃的菜单保存至sessionStorage以及vuex
      this.setActive(route.id + "");
      // sessionStorage.setItem("defaultActive", route.id + "");
      // 路由跳转
      this.$router.push({ path: route.path || "404" });
    },
    ...mapMutations(["setActive"]),
  },
};
</script>

<style scoped lang="scss">
.nav-menu {
  user-select: none;

  .logo {
    display: flex;
    height: 28px;
    padding: 17px 10px 8px 5px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  .el-submenu {
    background-color: #545c64;
  }

  .el-menu-item {
    color: #fff;
    background-color: #545c64;
  }

  // hover 高亮
  .el-menu-item:hover {
    background-color: #434a50;
  }

  .el-menu-item.is-active {
    color: #fff;
    background-color: #a8a8a8;
  }
}

// 菜单可滚动
// .el-menu {
//   border: none !important;
// }

// 菜单不可滚动
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>

<style>
.el-submenu__title {
  color: #fff;
}
.el-submenu__title:hover {
  background-color: #434a50 !important;
}

/* 菜单可滚动 */
/* .nav-el-menu {
  width: 100%;
  height: 670px;
  position: relative;
  overflow: hidden;
}
.el-menu-vertical {
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #545c64;
} */
</style>