<template>
    <nav>
        <div class="logo">
          <router-link to="/home" alt="logo" >
            <img src="../assets/icon-left-font-cropped.png" alt="logo" class="big"/>
          </router-link>
          <router-link to="/home" alt="logo" >
            <img src="../assets/icon.png" alt="logo" class="small"/>
          </router-link>
        </div>
        <div class="menu">
          <router-link to="/home" class="menu_link" active-class="selected">
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
    </nav>
</template>



<style scoped>
 .small {
  display:none;
}
.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.menu a {
  text-decoration: none;
  width: 50px;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 25px;
  color: grey;
  margin: 0px 5px;
  font-size: 27px;
}

.menu .selected {
  color: rgb(5, 113, 255);
  border-bottom: 3px solid rgb(5, 113, 255);
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
  height: 50px;
  background-color: rgb(5, 113, 255);
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
  color: white;
  font-weight: bold;
}

@media all and (max-width: 900px) {
.big{
  display: none;
}

.small {
  display: unset;
  width: 50px;
  padding: 0px 10px;
}

.menu a {
  text-decoration: none;
  width: 30px;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 25px;
  color: grey;
  margin: 0px 5px;
  font-size: 27px;
}

  .logo {
    padding: 0;
  }
  .profile {
  display: flex;
  align-items: center;
  padding: 10px 10px;
}

.info {
  margin-right: 0px;
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  height: 50px;
  background-color: rgb(5, 113, 255);
}
}
</style>

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