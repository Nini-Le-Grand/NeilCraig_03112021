<template>
  <div>
    <Navbar class="navbar" />
    <SearchUserForm @usersFound="setRequest" class="searchBar" />
    <div class="show_container">
      <div class="cardbox">
        <div v-if="!hasFoundUser">
          Aucun utilisateur ne correspond à la recherche !
        </div>
        <div v-else v-for="user in users" :key="user.id" class="card" >
          <UserCard v-if="!isUser(user.id)" :user="user" class="card_style"/>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.searchBar {
  margin: 15px 0px;
}

.show_container {
  background-color: rgb(184, 223, 255);
}

.cardbox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: auto;
  padding-top: 10px;
}

.card_style {
  box-shadow: 0px 0px 5px 2px rgb(175, 175, 175);
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  height: 360px;
}
</style>

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
    SearchUserForm,
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
      if (payload.length != 0) {
        this.users = payload;
        this.hasFoundUser = true;
      } else {
        this.hasFoundUser = false;
        this.echecMessage = "";
      }
    },
  },
};
</script>