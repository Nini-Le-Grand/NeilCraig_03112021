<template>
<div>
  <Navbar class="navbar"/>
  <div class="container">
    <div v-for="user in users" :key="user.id">
      <UserCard v-if="!isUser(user.id)" :user="user" class="card" />
    </div>
  </div>
</div>
  
</template>

<script>
import Navbar from "../components/Navbar.vue"
import http from "../http";
import UserCard from "../components/cards/UserCard.vue";

export default {
  name: "Users",
  components: {
    Navbar,
    UserCard,
  },
  data() {
    return {
      users: "",
    };
  },
  mounted() {
    http
      .get("/auth/")
      .then((data) => {
        this.users = data.data;
      })
      .catch((err) => alert(err));
  },
  methods: {
    isUser(id) {
      if (this.$store.state.userId == id) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 30px;
  background-color: rgb(170, 221, 255);
  display: flex;
  flex-wrap: wrap;
}

.card {
  margin: 30px 20px;
  box-shadow: 0px 0px 10px 4px rgb(209, 209, 209);
  border-radius: 15px;
  background-color: white;
  height: 420px;
}
</style>