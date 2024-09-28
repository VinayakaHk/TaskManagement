<template>
  <v-app>
    <v-main>
      <alerts-view> </alerts-view>

      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AlertsView from "./views/AlertsView.vue";

export default {
  name: "App",
  components: { AlertsView },
  data: () => ({}),
};
</script>
