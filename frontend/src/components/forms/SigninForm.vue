<template>
  <form @submit.prevent="sendSignin()">
    <div class="toplabel">
      <label for="signin-firstName">Prénom *</label>
      <div class="error">
        {{ error }}
      </div>
    </div>

    <div class="input">
      <div class="input-logo">
        <i class="far fa-user"></i>
      </div>
      <input
        type="text"
        name="signin-firstName"
        v-model="firstName"
        placeholder="Prénom"
      />
    </div>

    <label for="signin-lastName">Nom *</label>
    <div class="input">
      <div class="input-logo">
        <i class="far fa-user"></i>
      </div>
      <input
        type="text"
        name="signin-lastName"
        v-model="lastName"
        placeholder="Nom"
      />
    </div>

    <label for="signin-email">Email *</label>
    <div class="input">
      <div class="input-logo">
        <i class="far fa-envelope"></i>
      </div>
      <input
        type="text"
        name="signin-email"
        v-model="email"
        placeholder="email@groupomania.fr"
      />
    </div>

    <label for="signin-password">Mot de passe *</label>
    <div class="input">
      <div class="input-logo">
        <i class="fas fa-key"></i>
      </div>
      <input
        type="password"
        name="signin-password"
        v-model="password"
        placeholder="Mot de passe"
      />
    </div>

    <button :disabled="disabled">S'inscrire</button>
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
      disabled: true,
    };
  },
  updated() {
    if (
      (this.firstName != "") &
      (this.lastName != "") &
      (this.email != "") &
      (this.password != "")
    ) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  },
  methods: {
    sendSignin() {
      console.log("sending");
      const request = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };
      http
        .post("/auth/signin", request)
        .then(() => {
          alert(
            "Votre inscription a bien été prise en compte ! \nVous allez être redirigé vers la page de connexion."
          );
          this.$emit("signin", {
            access: true,
            loginSelected: true,
            signinSelected: false,
          });
        })
        .catch((err) => {
          alert("Une erreur s'est produite lors de votre inscription !");
          if (err.response.data.errno == 1062) {
            this.error = "Utilisateur déjà créé !";
          }
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