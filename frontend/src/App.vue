<template>
  <c-box id="app">
    <router-view></router-view>
  </c-box>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  inject: ["$chakraColorMode", "$toggleColorMode"],
  data: () => ({
    showBanner: process.env.VUE_APP_PROD_URL != null,
    prodUrl: process.env.VUE_APP_PROD_URL,
    showMoveBanner: process.env.VUE_APP_IS_HEROKU == "true",
  }),
/*   methods: {
    toggleMode: () => this.$toggleColorMode,
  }, */
  computed: {
    colorMode() {
      return this.$chakraColorMode();
    },
  },
});
</script>

<style>
* {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  align-items: center;
  padding: 0 20px;
}
</style>
