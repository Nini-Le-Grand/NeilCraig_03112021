<template>
  <div>
    <PostCard v-for="post in posts" :key="post.id" :post_props="post" :userId_props="userId"/>
  </div>
</template>

<script>
import http from "../../http";
import PostCard from "../cards/PostCard.vue";

export default {
  name: "DashPosts",
  components: {
    PostCard,
  },
  props: {
    userId_props: {
      type: Number,
    },
  },
  data() {
    return {
      userId: this.userId_props,
      posts: [],
    };
  },
  mounted() {
    http.get(`/posts/user/${this.userId}`).then((data) => {
      this.posts = data.data;
    });
  },
  beforeUpdate() {
    this.userId = this.userId_props;
  },
  updated() {
    http.get(`/posts/user/${this.userId}`).then((data) => {
      this.posts = data.data;
    });
  }
};
</script>