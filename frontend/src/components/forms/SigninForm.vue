<template>
  <form action="signin" method="post">
    <div class="error">
      {{ error }}
    </div>

    <label for="signin-firstName">Prénom *</label>
    <div class="input">
      <div class="input-logo">
        <i class="far fa-user"></i>
      </div>
      <input type="text" name="signin-firstName" v-model="firstName" />
    </div>

    <label for="signin-lastName">Nom *</label>
    <div class="input">
      <div class="input-logo">
        <i class="far fa-user"></i>
      </div>
      <input type="text" name="signin-lastName" v-model="lastName" />
    </div>

    <label for="signin-email">Email *</label>
    <div class="input">
      <div class="input-logo">
        <i class="far fa-envelope"></i>
        </div>
      <input type="text" name="signin-email" v-model="email" />
    </div>

    <label for="signin-password">Mot de passe *</label>
    <div class="input">
      <div class="input-logo">
        <i class="fas fa-key"></i>
      </div>
      <input type="password" name="signin-password" v-model="password" />
    </div>

    <button type="button" name="btn-signin" @click="postSignin()">
      S'inscrire
    </button>
  </form>
</template>

<script>
import http from "../../http";

export default {
  name: "SigninForm",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: "* champ requis",
    };
  },

  methods: {
    postSignin() {
      const request = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
        };
      http
        .post("/auth/signin", request)
        .then(() => {
          alert("Votre inscription a bien été prise en compte ! \nVous allez être redirigé vers la page de connexion.")
          this.$emit("changePage", {
            value: true,
          });
        })
        .catch(() => {
          alert("Une erreur s'est produite lors de votre inscription !")
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
  padding:8px;
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
  align-self: flex-start;
  width: 100%;
  padding: 10px;
  border-radius: 15px;
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