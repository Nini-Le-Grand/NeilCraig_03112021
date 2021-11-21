<template>
  <div>
    <Navbar />
    <Dashboard :userIdn="userId" />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Dashboard from "../components/Dashboard.vue";

export default {
  name: "User",
  components: {
    Navbar,
    Dashboard,
  },
  data() {
    return {
      userId: parseInt(this.$route.params.id),
    };
  },
};
</script>