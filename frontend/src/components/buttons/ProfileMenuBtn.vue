<template>
  <div>
    <button @click="toggle()">
      <i class="fas fa-cog"></i>
    </button>

    <ul v-if="isOpen">
      <li>
        <router-link to="/updateProfile" @click="toggle()">
          <span><i class="fas fa-user-cog label"></i>Modifier le profil</span>
          <span><i class="fas fa-chevron-right"></i></span>
        </router-link>
      </li>
      <li @click="logout()">
        <span><i class="fas fa-power-off label"></i>Se déconnecter</span>
      </li>
    </ul>
    <div v-if="isOpen" @click="toggle()" class="outside"></div>
  </div>
</template>

<script>
export default {
  name: "menuProfile",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
span {
  font-size: 18px;
}
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 9999px;
  cursor: pointer;
  border: none;
}

.outside {
  z-index: 1;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: transparent;
}

a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: black;
  font-size: 18px;
}

i {
  font-size: 25px;
}

.label {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-right: 30px;
  border-radius: 9999px;
  background-color: rgb(189, 189, 189);
}

.last {
  justify-self: flex-end;
}

ul {
  list-style-type: none;
  margin: 0px 0px 0px 0px;
  width: 300px;
  padding: 10px;
  background-color: white;
  box-shadow: 0px 5px 10px 1px rgb(184, 184, 184);
  border-radius: 5px;
  position: absolute;
  top: 75px;
  right: 0;
  z-index: 2;
}

li {
  border-radius: 15px;
  margin: 10px auto;
  cursor: pointer;
  padding: 5px;
}

li:hover {
  background-color: rgb(238, 238, 238);
}
</style>
