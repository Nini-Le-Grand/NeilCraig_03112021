<template>
  <form action="#">
    <div class="error">
      {{ error }}
    </div>

    <label for="login-email">Email *</label>
    <div class="input">
      <div class="input-logo">
        <i class="far fa-envelope"></i>
      </div>
      <input type="email" name="login-email" v-model="email" />
    </div>

    <label for="login-password">Mot de passe *</label>
    <div class="input">
      <div class="input-logo">
        <i class="fas fa-key"></i>
      </div>
      <input type="password" name="login-password" v-model="password" />
    </div>

    <button type="submit" name="btn-login" @click.prevent="postLogin()">
      Se connecter
    </button>
  </form>
</template>

<script>
import http from "../../http";
import { mapMutations } from "vuex";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      error: "* champ requis",
    };
  },
  methods: {
    ...mapMutations(["initUser"]),

    postLogin() {
      let request = {
        email: this.email, 
        password: this.password
        }
      http
        .post("/auth/login", request)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          this.initUser(response.data);
          this.$router.push("Home");
        })
        .catch((error) => {
          this.error = error.response.data.error;
        });
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

label {
  margin-bottom: 5px;
}

input {
  font-size: 20px;
  border: 0px solid white;
  width: 100%;
}

input:focus {
  outline: none;
}

.input {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  border-radius: 15px;
  padding: 8px;
  border: 2px solid rgb(196, 196, 196);
  color: rgb(184, 184, 184);
  background-color: white;
}

.input:hover {
  box-shadow: 0px 0px 2px 4px rgba(184, 184, 184, 0.151);
}
.input:focus-within {
  border: 2px solid blue;
  color: black;
}

.input-logo {
  margin-right: 10px;
}

button {
  align-self: flex-end;
  width: 100%;
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 30px;
  font-size: 20px;
}

button:hover {
  cursor: pointer;
}

.error {
  align-self: flex-end;
  color: red;
  text-align: center;
  height: 23px;
}
</style>