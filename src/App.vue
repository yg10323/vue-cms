<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import user from "@/views/user/user.vue";
export default {
  components: { user },
};
</script>
<style lang="scss">
@import url("./assets/style/normalize.css");
@import url("./assets/style/base.css");
</style>
