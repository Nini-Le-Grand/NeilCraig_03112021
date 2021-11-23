<template>
  <div class="userContainer">
    <div v-if="userDeleted" class="userDeleted">Utilisateur inconnu</div>
    <router-link v-else :to="'/user/' + userId">
      <div class="user_pres">
        <div class="userImg">
          <img :src="user.imageUrl" alt="Photo de profil" class="img" />
        </div>
        <div class="userName">{{ user.lastName }} {{ user.firstName }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import http from "../../http";

export default {
  name: "PostUser",
  props: {
    userId: {
      Number,
    },
  },
  data() {
    return {
      id: this.userId,
      user: {},
      userDeleted: false,
    };
  },
  mounted() {
    http.get(`auth/${this.id}`).then((data) => {
      if (data.data.length == 0) {
        this.userDeleted = true;
      } else {
        this.user = data.data[0];
      }
    });
  },
};
</script>

<style scoped>
.user_pres {
  display: flex;
  align-items: center;
}

.userName {
  font-weight: bold;
  font-size: 22px;
  color: rgb(5, 113, 255);
}

.userImg {
  width: 40px;
  height: 40px;
  border: 1px solid rgb(5, 113, 255);
  border-radius: 9999px;
  overflow: hidden;
  margin-right: 15px;
}

.img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.userContainer {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>>
