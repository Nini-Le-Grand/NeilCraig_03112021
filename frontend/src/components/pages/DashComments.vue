<template>
  <div>
    <PostCard v-for="post in posts" :key="post.id" :postObject="post" />
  </div>
</template>

<script>
import http from "../../http";
import PostCard from "../cards/PostCard.vue";

export default {
  name: "DashComments",
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
      comments: [],
      postsId: [],
      posts: [],
    };
  },
  mounted() {
    http
    .get(`/comments/user/${this.userId}`)
    .then((data) => {
      this.comments = data.data;
      for (let comment of this.comments) {
        if (!this.postsId.includes(comment.postId)) {
          this.postsId.push(comment.postId);
        }
      }
      for (let id of this.postsId) {
        http
        .get(`/posts/${id}`)
        .then((data) => {
          this.posts.push(data.data[0]);
        });
      }
    });
    
  },
};
</script>