<template>
  <div>
    <PostCard v-for="post in posts" :key="post.id" :post_props="post" :userId_props="userId"/>
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
      posts: [],
    };
  },
  mounted() {
    http
      .get(`/comments/user/${this.userId}`)
      .then((data) => {
        
        let comments = data.data;
        let postsId = []
        for (let comment of comments) {
          if (!postsId.includes(comment.postId)) {
            postsId.push(comment.postId);
          }
        }
        return postsId;
      })
      .then((postsId) => {
        console.log(postsId);
        for (let id of postsId) {
          http
          .get(`/posts/${id}`)
          .then((data) => {
            this.posts.push(data.data[0]);
          });
        }
      });
  },
  beforeUpdate() {
    this.userId = this.userId_props;
  },
};
</script>