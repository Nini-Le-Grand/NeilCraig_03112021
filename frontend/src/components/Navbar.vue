<template>
  <div>
    <nav>
      <div class="nav">
        <div class="logo">
          <router-link to="/home">
            <img src="../assets/icon-left-font-cropped.png" alt="" />
          </router-link>
        </div>
        <div class="menu">
          <router-link to="/home" active-class="selected">
            <i class="fas fa-house-user"></i>
          </router-link>
          <router-link to="/feed" active-class="selected">
            <i class="fas fa-comments"></i>
          </router-link>
          <router-link to="/users" active-class="selected">
            <i class="fas fa-users"></i>
          </router-link>
        </div>
        <div class="profile">
          <div class="info">
            <div class="picture">
              <img v-if="hasImage()" class="picture-img" :src="renderImg()" />
              <i v-else class="far fa-image" ></i>
            </div>
            <div class="name">{{ $store.state.firstName }}</div>
          </div>
          <ProfileMenuBtn />
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import ProfileMenuBtn from "./buttons/ProfileMenuBtn.vue";

export default {
  name: "Navbar",
  data() {
    return {
      userId: this.$store.state.userId,
      isOpen: false,
    };
  },
  components: { 
    ProfileMenuBtn 
  },
  methods: {
    hasImage() {
      if (this.$store.state.imageUrl != "") {
        return true;
      } else {
        return false;
      }
    },
    renderImg() {
      let imageUrl = this.$store.state.imageUrl;
      return imageUrl;
    },
  },
};
</script>

<style scoped>
.menu {
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu a {
  text-decoration: none;
  width: 80px;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
  color: grey;
  margin: 0px 5px;
}

.menu .selected {
  color: blue;
  border-bottom: 3px solid blue;
}

.menu .selected:hover {
  border-radius: 0;
  background-color: white;
}

.menu a:hover {
  background-color: rgb(228, 228, 228);
  border-radius: 10px;
}

a > img {
  width: 250px;
}
nav {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
}

.nav {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  box-shadow: 0px 0px 6px 2px rgb(212, 212, 212);
  background-color: white;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
}

.logo a {
  display: flex;
  align-items: center;
}

.profile {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

.info {
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  background-color: rgb(211, 211, 211);
  height: 50px;
  background-color: rgba(142, 194, 255, 0.384);
}
.picture {
  border: 1px solid white;
  border-radius: 9999px;
  height: 42px;
  width: 42px;
  margin-left: 3px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.picture-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.name {
  margin-right: 15px;
  color: blue;
}
</style>