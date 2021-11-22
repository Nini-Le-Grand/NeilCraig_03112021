<template>
<div>
  <Navbar class="navbar"/>
  <SearchUserForm @usersFound="setRequest"/>
  <div class="container">
    <div v-if="!hasFoundUser"> Aucun utilisateur ne correspond à la recherche ! </div>
    <div v-else v-for="user in users" :key="user.id">
      <UserCard v-if="!isUser(user.id)" :user="user" class="card" />
    </div>
  </div>
</div>
  
</template>

<script>
import Navbar from "../components/Navbar.vue";
import http from "../http";
import UserCard from "../components/cards/UserCard.vue";
import SearchUserForm from "../components/forms/SearchUserForm.vue";

export default {
  name: "Users",
  components: {
    Navbar,
    UserCard,
    SearchUserForm
  },
  data() {
    return {
      users: "",
      hasFoundUser: true,
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
    setRequest(payload) {
      if(payload.length != 0) {
        this.users = payload;
        this.hasFoundUser = true;
      } else {
        this.hasFoundUser = false;
        this.echecMessage = ""
      }
      
    }
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