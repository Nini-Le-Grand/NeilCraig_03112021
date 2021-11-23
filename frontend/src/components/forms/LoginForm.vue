<template>
  <form @submit.prevent="send()">
    <div class="toplabel">
      <label for="login-email">Email *</label>
      <div class="error">
        {{ error }}
      </div>
    </div>

    <div class="input">
      <div class="input-logo">
        <i class="far fa-envelope"></i>
      </div>
      <input
        type="text"
        name="login-email"
        placeholder="email@groupomania.fr"
        v-model="email"
      />
    </div>

    <label for="login-password">Mot de passe *</label>
    <div class="input">
      <div class="input-logo">
        <i class="fas fa-key"></i>
      </div>
      <input
        type="password"
        name="login-password"
        placeholder="Mot de passe"
        v-model="password"
      />
    </div>

    <button :disabled="disabled">Se connecter</button>
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
      disabled: true,
    };
  },
  updated() {
    if ((this.email != "") & (this.password != "")) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  },
  methods: {
    ...mapMutations(["initUser"]),

    send() {
      let request = {
        email: this.email,
        password: this.password,
      };
      http
        .post("/auth/login", request)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          this.initUser(response.data);
          console.log(this.$store.state);
          this.$router.push("Feed");
        })
        .catch((error) => {
          this.error = error.response.data.error;
        });
    },
  },
};
</script>

<style scoped>
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

.toplabel {
  display: flex;
  justify-content: space-between;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 3px;
  font-size: 16px;
}

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
  color: rgb(5, 113, 255);
}

.input-logo {
  margin-right: 10px;
}

.error {
  color: rgb(255, 67, 67);
  font-size: 16px;
}
</style>

