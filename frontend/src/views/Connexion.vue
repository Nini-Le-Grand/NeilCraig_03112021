<template>
  <div class="container">
    <div class="banner">
      <Banner />
    </div>
    <div class="connexion">
      <div class="card">
        <div class="top">
          <header>
            <h1>Bienvenue sur votre réseau social interne !</h1>
          </header>
          <div class="connexionCard">
            <LoginForm v-if="access" />
            <SigninForm v-else @signin="goToLogin" />
          </div>
        </div>

        <nav>
          <button
            @click="showSigninForm()"
            :class="{ selected: signinSelected }"
          >
            S'inscrire
          </button>
          <button @click="showLoginForm()" :class="{ selected: loginSelected }">
            Se connecter
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";
import SigninForm from "../components/forms/SigninForm.vue";
import LoginForm from "../components/forms/LoginForm.vue";

export default {
  name: "Connexion",
  components: { Banner, SigninForm, LoginForm },
  data() {
    return {
      access: true,
      signinSelected: false,
      loginSelected: true,
    };
  },
  methods: {
    showSigninForm() {
      this.access = false;
      this.loginSelected = false;
      this.signinSelected = true;
    },
    showLoginForm() {
      this.access = true;
      this.loginSelected = true;
      this.signinSelected = false;
    },
    goToLogin(payload) {
      this.access = payload.access;
      this.loginSelected = payload.loginSelected;
      this.signinSelected = payload.signinSelected;
    },
  },
};
</script>

<style scoped>
@media all and (max-width: 1000px) {
  .banner {
    display: none;
  }

  .connexion {
   background-color: grey; 
  }
}

.selected {
  background-color: rgb(5, 113, 255);
  color: white;
  font-weight: bold;
}
.selected:hover {
  background-color: rgb(5, 113, 255);
  box-shadow: 0px 0px 4px 1px rgb(5, 113, 255);
  color: white;
}

button {
  width: 50%;
  padding: 15px 0px;
  border: 0;
  background-color: white;
  cursor: pointer;
  font-weight: bold;
  border: 2px solid rgb(5, 113, 255);
}

button:hover {
  background-color: white;
  box-shadow: 0px 0px 5px 1px rgb(5, 113, 255);
  color: rgb(5, 113, 255);
}
.container {
  display: flex;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 25px;
}
nav {
  text-align: center;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 10px 3px rgb(184, 223, 255);
}
img {
  width: 300px;
}
.logo {
  text-align: center;
}
.page {
  display: flex;
}
.banner {
  background-position: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex: 6;
}
.connexion {
  background-color: rgb(184, 223, 255);
  flex: 6;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  height: 550px;
  max-width: 400px;
  margin: auto;
  box-shadow: 0px 0px 10px 4px rgb(216, 216, 216);
}
</style>

