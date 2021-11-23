<template>
<div>
  <Navbar class="navbar"/>
  <Dashboard :userId_props="userId" />
</div>
  
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Dashboard from "../components/Dashboard.vue"

export default {
  name: "Home",
  components: { Navbar, Dashboard },

  data() {
    return {
      userId: this.$store.state.userId,
    };
  },

  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
