<template>
  <div class="container">
    <form @submit.prevent="send()">
      <label for="searchName">Rechercher un collaborateur</label>
      <input
        type="text"
        name="SearchName"
        v-model="searchName"
      />
      <button>Rechercher</button>
    </form>
  </div>
</template>

<script>
import http from "../../http";

export default {
  name: "SearchUserForm",
  data() {
    return {
      searchName: "",
    };
  },
  methods: {
    send() {
      if (this.searchName != "")
        http
        .get(`/auth/find/${this.searchName}`)
        .then((data) => {
            this.$emit("usersFound", data.data);
        });
    },
  },
};
</script>