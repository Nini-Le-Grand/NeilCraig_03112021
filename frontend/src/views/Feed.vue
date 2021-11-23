<template>
  <div>
    <Navbar class="navbar"/>
    <div class="container">
      <div class="formbox">
        <PostForm />
      </div>
      <div class="feedbox">
        <PostCard v-for="post in posts" :key="post.id" :post_props="post" :userId_props="userId"/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"; 
import PostForm from "../components/forms/PostForm.vue";
import PostCard from "../components/cards/PostCard.vue";
import http from "../http";

export default {
  name: "Feed",
  components: {
    Navbar,
    PostForm,
    PostCard,
  },

  data() {
    return {
      userId: this.$store.state.userId,
      posts: [],
    };
  },

  mounted() {
    http
      .get("posts/")
      .then((data) => {
        this.posts = data.data;
      })
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: rgb(184, 223, 255);
  display: flex;
  justify-content: space-around;
}

.formbox {
  width: 35%;
}

.feedbox {
  width: 60%;
  display: flex;
  flex-direction: column;
}

@media all and (max-width: 900px) {
  .container {
  padding: 0px;
  background-color: rgb(184, 223, 255);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.formbox {
  width: 90%;
  margin: 20px auto;
}

.feedbox {
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: auto;
}
}
</style>