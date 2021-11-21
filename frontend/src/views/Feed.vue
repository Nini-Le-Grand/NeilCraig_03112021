<template>
  <div>
    <Navbar class="navbar"/>
    <div class="container">
      <div class="formbox">
        <PostForm />
      </div>
      <div class="feedbox">
        <PostCard v-for="post in posts" :key="post.id" :postObject="post" />
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
  background-color: rgb(94, 158, 255);
  display: flex;
  justify-content: space-around;
}

.formbox {
  width: 30%;
}

.feedbox {
  width: 60%;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
}
</style>