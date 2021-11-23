<template>
  <div class="container">
    <form @submit.prevent="send()" class="form">
      <label for="searchName" class="label">Rechercher</label>
      <input
        class="text"
        type="text"
        name="SearchName"
        v-model="searchName"
        placeholder="John"
        @input="send"
      />
      <button><i class="fas fa-search"></i></button>
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
      if (this.searchName != "") {
        http.get(`/auth/find/${this.searchName}`).then((data) => {
          this.$emit("usersFound", data.data);
        });
      } else {
        http.get("/auth/").then((data) => {
          this.$emit("usersFound", data.data);
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  background-color: white;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 2px solid rgb(5, 113, 255);
  overflow: hidden;
}
.label {
  display:flex;
  justify-content: center;
  align-items: center;
  padding: 7px 5px;
  font-size: 18px;
  font-weight: bold;
  color: rgb(5, 113, 255);
  border-right: 2px solid rgb(5, 113, 255);
  background-color: white;
}

.text {
  font-size: 18px;
  padding: 5px;
  width: 400px;
   outline: none;
   border: 0;
}

.text:focus {
  outline: none;
}

.text:focus::placeholder {
  color: white;
}
button {
  font-size: 18px;
  padding: 7px 15px;
  border: 0;
  background-color: rgb(5, 113, 255);
  cursor: pointer;
  color: white;
}
button:hover {
  box-shadow: 0px 0px 5px 2px rgb(5, 113, 255);
}
</style>