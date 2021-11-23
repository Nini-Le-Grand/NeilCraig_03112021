<template>
  <div class="form-container">
    <h2><i class="fas fa-lock label"></i>Modifier le mot de passe</h2>
    <form @submit.prevent="sendReq()">
      <label for="oldPassword">Mot de passe actuel</label>
      <div class="input">
        <div class="input-logo">
          <i class="fas fa-backspace textLabel"></i>
        </div>
        <input
          type="text"
          id="oldPassword"
          name="oldPassword"
          v-model="oldPassword"
        />
      </div>

      <label for="newPassword">Nouveau mot de passe</label>
      <div class="input">
        <div class="input-logo">
        <i class="fas fa-key textLabel"></i>
        </div>
        <input
          type="text"
          id="newPassword"
          name="newPassword"
          v-model="newPassword"
        />
      </div>

      <button :disabled="disabled">Modifier le mot de passe</button>
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
      disabled: true,
    };
  },
  updated() {
    if ((this.oldPassword != "") & (this.newPassword != "")) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
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
            alert(data.data.message);
            this.$router.push("Home");
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
input {
  font-size: 18px;
  border: 0px solid white;
  width: 100%;
}

input::placeholder {
  color: rgb(211, 211, 211);
}

input:focus {
  outline: none;
}

input:focus::placeholder {
  color: white;
}

.input {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 8px;
  border: 2px solid rgb(196, 196, 196);
  color: rgb(184, 184, 184);
  background-color: white;
}

.input:hover {
  box-shadow: 0px 0px 2px 4px rgba(184, 184, 184, 0.151);
}
.input:focus-within {
  border: 2px solid rgb(5, 113, 255);
  color: black;
}

.input-logo {
  margin-right: 10px;
}

.label {
  font-size: 30px;
  margin-right: 5px;
}

h2 {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3px;
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
  margin-bottom: 3px;
}

button {
  padding: 10px 0px;
  color: rgb(5, 113, 255);
  background-color: white;
  border: 2px solid rgb(5, 113, 255);
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  box-shadow: 0px 0px 5px 1px rgb(5, 113, 255);
}

button:disabled {
  color: rgb(192, 192, 192);
  cursor: unset;
  border: 2px solid rgb(192, 192, 192);
  background-color: rgb(238, 238, 238);
  box-shadow: 0px 0px 0px 0px white;
}
</style>