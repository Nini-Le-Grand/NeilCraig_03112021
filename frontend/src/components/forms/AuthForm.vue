<template>
  <div class="form-container">
    <h2><i class="fas fa-lock label"></i>Modifier le mot de passe</h2>
    <form @submit.prevent="sendReq()">
      <label for="oldPassword">Mot de passe actuel</label>
      <div class="textInput">
        <i class="fas fa-backspace textLabel"></i>
        <input
          type="text"
          id="oldPassword"
          name="oldPassword"
          v-model="oldPassword"
        />
      </div>

      <label for="newPassword">Nouveau mot de passe</label>
      <div class="textInput">
        <i class="fas fa-key textLabel"></i>
        <input
          type="text"
          id="newPassword"
          name="newPassword"
          v-model="newPassword"
        />
      </div>

      <button>Modifier le mot de passe</button>
    </form>
  </div>
</template>

<script>
import http from "../../http";
export default {
  name: "AuthForm",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
    };
  },
  methods: {
    sendReq() {
      if (confirm("Êtes vous sûr de vouloir modifier votre mot de passe ?")) {
        let request = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        };
        http
          .put("/auth/updatePassword", request)
          .then((data) => {
            alert(data.data.message)
            this.$router.push("Home")
          })
          .catch((err) => {
            alert(err.response.data.error);
          });
      }
    },
  },
};
</script>

<style scoped>
.textLabel {
  margin-right: 15px;
}
.textInput {
  border: 2px solid rgb(197, 197, 197);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-size: 30px;
  color: rgb(197, 197, 197);
  margin-bottom: 25px;
}

input[type="text"] {
  width: 100%;
  border: none;
  font-size: 20px;
}

input[type="text"]:focus {
  outline: none;
}

.textInput:hover {
  box-shadow: 0px 0px 2px 4px rgba(184, 184, 184, 0.151);
}

.textInput:focus-within {
  border: 2px solid rgb(71, 104, 255);
  color: black;
}

.label {
  margin-right: 20px;
  font-size: 50px;
}

h2 {
  text-align: center;
  height: 60px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 5px 10px 2px rgb(190, 190, 190);
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

button {
  margin-bottom: 20px;
  border-radius: 9999px;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
}
</style>