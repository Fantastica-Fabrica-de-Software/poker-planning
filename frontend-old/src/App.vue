<template>
    <router-view></router-view>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    showBanner: process.env.VUE_APP_PROD_URL != null,
    prodUrl: process.env.VUE_APP_PROD_URL,
    showMoveBanner: process.env.VUE_APP_IS_HEROKU == "true",
  }),
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
  background-color: #F7F8FD !important;
}

header {
  align-items: center;
  padding: 0 20px;
}
</style>
