<template>
<div>
  <Navbar class="navbar"/>
  <Dashboard :userIdn="userId" />
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

<style scoped>

.containers {
  background-color: rgb(173, 225, 255);
  display: flex;
  padding: 20px 60px;
  min-height: 100vh;
}
.profile {
  width: 20%;
}
.activity {
  flex: 1;
  margin: 0px 20px;
}
.relations {
  width: 30%;
}
</style>