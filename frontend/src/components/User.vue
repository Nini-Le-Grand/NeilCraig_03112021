<template>
  <div>
    <Navbar />
    <Dashboard :userId_props="userId" />
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
  watch: {
    $route (to) {
      
      if(to.params.id) {
        console.log(to.params.id);
        this.userId = parseInt(to.params.id)
      }
    }
  }
};
</script>