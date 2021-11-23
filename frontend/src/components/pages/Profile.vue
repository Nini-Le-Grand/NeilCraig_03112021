<template>
  <div class="container">
    <h2>Profil</h2>
    <div class="info">
      <div class="picture">
        <img v-if="hasImage()" class="picture-img" :src="renderImg()" />
        <i v-else class="far fa-image"></i>
      </div>
      <div class="name">{{ userData.firstName }} {{ userData.lastName }}</div>
      <a :href="href" class="email">
        {{ userData.email }}
      </a>
      <div class="position">
        {{ userData.position }}
      </div>
      <div class="description">
        {{ userData.description }}
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http";

export default {
  name: "Profile",
  props: {
    userId_props: {
      type: Number,
    },
  },

  data() {
    return {
      userId: this.userId_props,
      userData: "",
      href: ""
    };
  },
  mounted() {
    http.get(`auth/${this.userId}`).then((data) => {
      this.userData = data.data[0];
      this.href= `mailto:${this.userData.email}`
    })
  },
  beforeUpdate() {
    this.userId = this.userId_props;
  },
  updated() {
    http.get(`auth/${this.userId}`).then((data) => {
      this.userData = data.data[0];
    })
  },
  methods: {
    hasImage() {
      if (this.userData.imageUrl != "") {
        return true;
      } else {
        return false;
      }
    },
    renderImg() {
      let imageUrl = this.userData.imageUrl;
      return imageUrl;
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}
.container {
  padding: 20px;
  background-color: white;
  border-radius: 15px;
}

.description {
  font-style: italic;
  font-size: 18px;
  margin-bottom: 10px;
}
.position {
  margin: 10px 0px;
}
.name {
  font-weight: bold;
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
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: white;
box-shadow: 0px 5px 10px 2px rgb(206, 206, 206);
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

@media all and (max-width: 550px)  {
  .container {
      border-radius: 0;
  }
}
</style>>
