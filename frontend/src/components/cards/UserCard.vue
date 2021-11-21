<template>
  <div class="containerr">
    <div class="info">
      <div class="picture">
        <img v-if="hasImage()" class="picture-img" :src="renderImg()" />
        <i v-else class="far fa-image"></i>
      </div>
      <router-link :to="'/users/' + user.id">
        <div class="name">{{ user.firstName }} {{ user.lastName }}</div>
      </router-link>
      <div class="email">
        {{ user.email }}
      </div>
      <div class="position">
        {{ user.position }}
      </div>
      <div class="description">
        {{ user.description }}
      </div>
    </div>

    <Followbtn :partnerId="user.id" />
  </div>
</template>

<script>
import Followbtn from "../buttons/Followbtn.vue";

export default {
  name: "UserCard",
  components: {
    Followbtn,
  },
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    hasImage() {
      if (this.user.imageUrl != "") {
        return true;
      } else {
        return false;
      }
    },
    renderImg() {
      let imageUrl = this.user.imageUrl;
      return imageUrl;
    },
  },
};
</script>

<style scoped>
.description {
  font-style: italic;
  font-size: 18px;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.position {
  margin: 10px 0px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.name {
  font-weight: bold;
  text-align: center;
  min-height: 45px;
}
.email {
  color: blue;
  text-decoration: underline;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.containerr {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: white;
  width: 200px;
}

.picture {
  border: 1px solid grey;
  border-radius: 9999px;
  height: 150px;
  width: 150px;
  margin-left: 3px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 15px;
}

.picture-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
</style>