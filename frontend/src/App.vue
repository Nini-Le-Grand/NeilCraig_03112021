<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  mounted() {
    if(this.isConnect) {
      this.$router.push("Home");
    }
  },
  computed: {
    ...mapState(["userId"]),

    isConnected() {
      return this.userId > 0;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-decoration: none;
}
.navbar {
  position: sticky;
  top: 0;
}
</style>